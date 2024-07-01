using System;
using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class CategoryProfile : Profile
	{
		public CategoryProfile()
		{
			CreateMap<Category, CategoryDto>().ReverseMap();
			CreateMap<Category, CategoryReadDto>();
			CreateMap<Category, Category>();
            CreateMap<Category, CategoryUpdateDto>().ReverseMap();
        }
	}
}

