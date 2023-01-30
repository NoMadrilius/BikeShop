using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.CQRS.Commands.Product.UpdateProduct;

namespace BikeShop.Workspace.WebApi.Models.Product
{
    public class UpdateProductModel : IMappable
    {
        [Required] public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string CatalogKey { get; set; } = string.Empty;
        [Required] public string Category { get; set; } = string.Empty;
        [Required] public string ManufacturerBarcode { get; set; } = string.Empty;

        [Required] public decimal IncomePrice { get; set; } = 0;
        [Required] public decimal DealerPrice { get; set; } = 0;
        [Required] public decimal RetailPrice { get; set; } = 0;

        [Required] public int BrandId { get; set; } = 0;

        [Required] public string CheckStatus { get; set; } = string.Empty;
        [Required] public bool RetailVisibility { get; set; } = false;
        [Required] public bool B2BVisibility { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateProductModel, UpdateProductCommand>();
        }
    }
}