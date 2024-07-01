using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class ShippingInfoProfile : Profile
	{
		public ShippingInfoProfile()
		{
			CreateMap<Shippinginfo, ShippingInfoDto>().ReverseMap();
			CreateMap<Shippinginfo, ShippingInfoReadDto>();
			CreateMap<Shippinginfo, Shippinginfo>();
			CreateMap<Shippinginfo, ShippingInfoUpdateDto>().ReverseMap();
        }
	}
}

