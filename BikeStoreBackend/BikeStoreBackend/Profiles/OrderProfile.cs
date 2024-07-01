using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class OrderProfile: Profile
	{
		public OrderProfile()
		{
			CreateMap<Order, OrderDto>().ReverseMap();
			CreateMap<Order, OrderReadDto>().ReverseMap();
			CreateMap<Order, Order>();
            CreateMap<Order, OrderUpdateDto>().ReverseMap();
        }
	}
}

