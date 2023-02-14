﻿using System.Security.Claims;
using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;
using BikeShop.Identity.Application.CQRS.Commands.UpdateUserPublic;
using BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;
using BikeShop.Identity.WebApi.Models.User;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers;

// Все для работы с данными пользователей. Получение, редактирование, ...
[ApiController]
[Route("user")]
[Produces("application/json")]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public UserController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    /// <summary>
    /// Обновление публичной даты пользователя (ФИО, почта)
    /// </summary>
    /// 
    /// <remarks>
    /// В HTTP Headers необходимо передать Access Token (Authorization: Bearer ey...). По нему происходит идентификация пользователя
    /// </remarks>
    ///
    /// <param name="model">Публичные данные о пользователе</param>
    /// 
    /// <returns>Ничего. Модель ошибки в случае неудачи</returns>
    /// <response code="200">Успешное изменение</response>
    /// <response code="400">В access токене не указан id пользователя</response>
    /// <response code="401">Не передан access токен</response>
    /// <response code="404">Пользователь с указанным id не найден</response>
    /// <response code="409">Указанная почта уже зарегистрирована на какого-то пользователя</response>
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut("updatepublic")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> UpdateUserPublic([FromBody] UpdateUserPublicModel model)
    {
        // Console.WriteLine("start");
        // var claims = (User.Identity as ClaimsIdentity)?.Claims;

        // foreach(var claim in claims)
        //     System.Console.WriteLine(claim.Type + " " + claim.Value);

        // Получаю id пользователя из jwt токена
        var req = (User.Identity as ClaimsIdentity)?.Claims
            .FirstOrDefault(c => c.Type == "id");
        var id = req?.Value;


        // Если в токене нету айди пользователя - ошибка
        if (id is null)
            return BadRequest(new
            {
                error = "invalid_access_token",
                errorDescription = "Update user public data error. Access token does not contains user id"
            });

        // Леплю команду и посылаю её на исполнение
        var command = new UpdateUserPublicCommand
        {
            UserId = id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Patronymic = model.Patronymic,
            Email = model.Email
        };

        await _mediator.Send(command);

        return Ok();
    }

    /// <summary>
    /// Создание нового пользователя
    /// </summary>
    /// 
    /// <remarks>
    /// Создание нового пользователя в базе с указанными данными с автогенерацией пароля. Ничего не возвращает.
    /// </remarks>
    /// 
    /// <param name="model">Модель создания пользователя</param>
    /// <returns>Ничего. Модель ошибки при неудаче.</returns>
    /// <response code="200">Успешно создан</response>
    /// <response code="400">Пользователь с указанным телефоном/паролем уже существует</response>
    /// <response code="422">Невалидная модель (например не указаны обязательные поля)</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserModel model)
    {
        // Если невалидная модель
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var command = _mapper.Map<CreateUserCommand>(model);
        await _mediator.Send(command);
        
        return Ok();
    }

    [HttpGet("find")]
    public async Task<ActionResult<UserModelListModel>> GetUsersByPhoneOrFio([FromQuery] GetUserByPhoneOrFioModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var query = _mapper.Map<GetUsersByPhoneOrFIOQuery>(model);
        var usersModel = await _mediator.Send(query);

        return Ok(usersModel);
    }
}