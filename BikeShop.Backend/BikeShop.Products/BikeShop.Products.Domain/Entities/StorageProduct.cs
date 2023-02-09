﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class StorageProduct : BaseEntity
    {
        public int ProductId { get; set; }
        public int StorageId { get; set; }
        public int Quantity { get; set; }
    }
}
