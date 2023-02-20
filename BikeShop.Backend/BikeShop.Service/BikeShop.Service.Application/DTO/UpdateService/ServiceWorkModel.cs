﻿using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.DTO.UpdateService
{
    public class ServiceWorkModel : ServiceWork, IMappable
    {
        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServiceWorkDTO, ServiceWorkModel>();
        }
    }
}
