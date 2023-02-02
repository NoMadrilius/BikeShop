﻿using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<Domain.Entities.Service> Services { get; set; }
    public DbSet<ServiceProduct> ServiceProducts { get; set; }
    public DbSet<ServiceWork> ServiceWorks { get; set; }
    public DbSet<Work> Works { get; set; }
    public DbSet<WorkGroup> WorkGroups { get; set; }

    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Создание первых стандартных групп услуг
        modelBuilder.Entity<WorkGroup>()
            .HasData(
                new WorkGroup
                {
                    Id = 1,
                    IsCollapsed = true,
                    ParentId = 0,
                    Name = "First work group",
                    ShopId = 1
                },
                new WorkGroup
                {
                    Id = 2,
                    IsCollapsed = true,
                    ParentId = 0,
                    Name = "Second work group",
                    ShopId = 1
                },
                new WorkGroup
                {
                    Id = 3,
                    IsCollapsed = false,
                    ParentId = 1,
                    Name = "First Child of first work group",
                    ShopId = 1
                }
            );

        // Создание первых услуг
        modelBuilder.Entity<Work>()
            .HasData(
                new Work
                {
                    Id = 1,
                    Name = "Work 1",
                    Description = "Work description 1",
                    CurrencyId = 1,
                    WorkGroupId = 1,
                    Price = 228
                },
                new Work
                {
                    Id = 2,
                    Name = "Work 2",
                    Description = "Work description 2",
                    CurrencyId = 1,
                    WorkGroupId = 1,
                    Price = 300
                },
                new Work
                {
                    Id = 3,
                    Name = "Work 3",
                    Description = "Work description 3",
                    CurrencyId = 1,
                    WorkGroupId = 2,
                    Price = 500
                }
            );
    }
}