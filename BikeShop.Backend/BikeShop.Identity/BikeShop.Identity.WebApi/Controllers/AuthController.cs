using System.Net;
using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;
using BikeShop.Identity.Application.CQRS.Commands.DeleteRefreshSessionByToken;
using BikeShop.Identity.Application.CQRS.Commands.SetRefreshSession;
using BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSession;
using BikeShop.Identity.Application.CQRS.Queries.GetUserById;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Services;
using BikeShop.Identity.WebApi.Models.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService; // для генерации JWT-токенов
    private readonly CookieService _cookieService; // для вставки рефреш токена в куки

    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public AuthController(JwtService jwtService, IMapper mapper, IMediator mediator, CookieService cookieService)
    {
        _jwtService = jwtService;
        _cookieService = cookieService;
        _mapper = mapper;
        _mediator = mediator;
    }

    /// <summary>
    /// Логин пользователя и создании сессии. Получение JWT-токенов доступа и рефреша.
    /// </summary>
    /// 
    /// <remarks>
    /// Указывается ИЛИ телефон, ИЛИ почта. Если и то и другое будет пустым - ответ 400
    /// </remarks>
    /// 
    /// <param name="model">Модель входа в аккаунт</param>
    /// <returns>JWT access token в теле, refresh token в http-only cookie (X-Refresh-Token) при успехе. Модель ошибки при неудаче</returns>
    /// 
    /// <response code="200">Успешный вход</response>
    /// <response code="400">И телефон и почта не указаны</response>
    /// <response code="404">Пользователь с такими учетными данными не найден.</response>
    /// <response code="422">Невалидная модель (например не указаны обязательные поля)</response>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        // Получаю пользователя по данным логина
        var getUserQuery = _mapper.Map<GetUserBySignInDataQuery>(model);
        var userData = await _mediator.Send(getUserQuery);

        // Создаю/обновляю рефреш сессию для пользователя и получаю рефреш токен
        var setSessionCommand = new SetRefreshSessionCommand { UserId = Guid.Parse(userData.User.Id) };
        var refreshToken = await _mediator.Send(setSessionCommand);

        // Добавляю рефреш токен в httpOnly cookie
        _cookieService.AddRefreshCookieToResponse(HttpContext.Response, refreshToken);

        // Генерирую access token для пользователя
        var accessToken = _jwtService.GenerateUserJwt(userData.User, userData.UserRoles);

        return Ok(new { accessToken });
    }

    /// <summary>
    /// Регистрация нового пользователя
    /// </summary>
    /// 
    /// <remarks>
    /// Создание нового пользователя в базе с указанными данными. Ничего не возвращает, для логина нужен будет отдельный запрос.
    /// </remarks>
    /// 
    /// <param name="model">Модель регистрации пользователя</param>
    /// <returns>Ничего. Модель ошибки при неудаче.</returns>
    /// <response code="200">Успешно зарегистрирован</response>
    /// <response code="400">Пользователь с указанным телефоном/паролем уже существует. Или пароль слишком простой.</response>
    /// <response code="422">Невалидная модель (например не указаны обязательные поля)</response>
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var command = _mapper.Map<CreateUserCommand>(model);
        var id = await _mediator.Send(command);

        //Console.WriteLine("Registered new user. ID: " + id);

        return Ok();
    }

    /// <summary>
    /// Обновление токенов для пользователя. Фактически обновлении сессии. 
    /// </summary>
    /// 
    /// <remarks>
    /// Берёт с cookie X-Refresh-Token рефреш токен, и если есть сессия на этот токен - обновляет её и возвращает новые токены.
    /// </remarks>
    /// 
    /// <param>Refresh token в cookie X-Refresh-Token</param>
    /// <returns>JWT access token в теле, refresh token в http-only cookie (X-Refresh-Token) при успехе. Модель ошибки при неудаче.</returns>
    /// <response code="200">Успешное обновлении сессии</response>
    /// <response code="404">Не найдена сессия на переданный refresh токен / Не найден пользователь, который привязан к сессии.</response>
    /// <response code="406">Не передан cookie X-Refresh-Token с рефреш токеном</response>
    [HttpPost("refresh")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> Refresh()
    {
        // Пытаюсь достать из куки рефреш токен. Если его нет - исключение
        if (!Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken))
            throw new RefreshTokenException("Cookie refresh token not found")
            {
                Error = "cookie_refresh_token_not_found",
                ErrorDescription = "Expected refresh token in httponly cookie does not exists"
            };

        // Обновляю рефреш сессию. Если пришедший рефреш токен невалидный - получим исключение
        // Если все ок - получу всю сессию, в том числе id пользователя
        var updateSessionCommand = new UpdateRefreshSessionCommand { RefreshToken = Guid.Parse(refreshToken) };
        var refreshSession = await _mediator.Send(updateSessionCommand);

        // Получаю пользователя этой сессии
        var getUserQuery = new GetUserByIdQuery { UserId = refreshSession.UserId };
        var userData = await _mediator.Send(getUserQuery);

        // Добавляю рефреш токен в httpOnly cookie
        _cookieService.AddRefreshCookieToResponse(HttpContext.Response, refreshSession.RefreshToken);

        // Генерирую новый access токен и возвращаю его 
        var accessToken = _jwtService.GenerateUserJwt(userData.User, userData.UserRoles);

        return Ok(new { accessToken });
    }

    /// <summary>
    /// Логаут. Удаление куки с рефреш токеном.
    /// </summary>
    /// 
    /// <remarks>
    /// Удаляет куки X-Refresh-Token с рефреш токеном. Удаляет сессию.
    /// </remarks>
    ///
    /// <param>Refresh token в cookie X-Refresh-Token</param>
    /// 
    /// <returns>Ничего. Модель ошибки в случае неудачи</returns>
    /// <response code="200">Успешный логаут. Куки удален.</response>
    /// <response code="404">Не найдена сессия с переданным refresh токеном</response>
    /// <response code="406">Не передан cookie X-Refresh-Token с рефреш токеном</response>
    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> Logout()
    {
        // Пытаюсь достать из куки рефреш токен. Если его нет - исключение
        if (!Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken))
            throw new RefreshTokenException("Cookie refresh token not found")
            {
                Error = "cookie_refresh_token_not_found",
                ErrorDescription = "Expected refresh token in httponly cookie does not exists"
            };

        // Удаляю сессию по рефреш токену из базы
        var deleteCommand = new DeleteRefreshSessionByTokenCommand() { RefreshToken = Guid.Parse(refreshToken) };
        await _mediator.Send(deleteCommand);

        // Удаляю кукас
        Response.Cookies.Delete("X-Refresh-Token");

        return Ok();
    }
}