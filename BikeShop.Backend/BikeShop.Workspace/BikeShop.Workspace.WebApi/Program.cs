using BikeShop.Workspace.Application;
using BikeShop.Workspace.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Инъекция сервисов из слоя Application и Persistence
builder.Services.AddApplication();
builder.Services.AddPersistence();

// Инициализация базы, если её нет
try
{
    var scope = builder.Services.BuildServiceProvider().CreateScope();
    var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    // temporary
    Console.WriteLine(ex);
}


var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();