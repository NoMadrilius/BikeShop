﻿using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BikeShop.Workspace.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    DbSet<Product> Products { get; set; }
    DbSet<ProductTag> ProductTags { get; set; }
    DbSet<Brand> Brands { get; set; }
    DbSet<TagToProductBind> TagToProductBinds { get; set; }


    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}