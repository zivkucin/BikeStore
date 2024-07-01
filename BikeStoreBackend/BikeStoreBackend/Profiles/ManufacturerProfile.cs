using System;
using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class ManufacturerProfile : Profile
	{
		public ManufacturerProfile()
		{
			CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
			CreateMap<Manufacturer, ManufacturerReadDto>();
            CreateMap<ManufacturerReadDto, ManufacturerReadDto>();
            CreateMap<Manufacturer, Manufacturer>();
            CreateMap<Manufacturer, ManufacturerUpdateDto>().ReverseMap();
        }
	}
}

