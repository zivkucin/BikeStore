using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class ProductProfile : Profile
	{
		public ProductProfile()
		{
            CreateMap<Product, ProductDto>().ReverseMap();
			CreateMap<Product, ProductReadDto>();
            CreateMap<Product, Product>();
			CreateMap<ProductUpdateDto, Product>().ReverseMap();
			
        }
	}
}

