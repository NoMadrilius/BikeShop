﻿using BikeShop.Shop.Application.Configurations;
using BikeShop.Shop.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Bikeshop.Shop.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        // Получаю сущность ConnectionConfiguration из сервисов
        var scope = services.BuildServiceProvider().CreateScope();
        var connectionConfiguration = scope.ServiceProvider.GetService<ConnectionConfiguration>();
       
        // Инжект DbContext-а
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlite(connectionConfiguration.Sqlite);
        });

        // Связал интерфейс контекста с ранее созданным сервисом на классе 
        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetService<ApplicationDbContext>());

        return services;
    }
}