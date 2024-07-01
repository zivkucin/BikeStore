using System;
using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class OrderItemProfile: Profile
	{
		public OrderItemProfile()
		{
			CreateMap<Orderitem, OrderItemDto>().ReverseMap();
			CreateMap<Orderitem, OrderItemReadDto>();
			CreateMap<Orderitem, Orderitem>();
            CreateMap<Orderitem, OrderItemUpdateDto>().ReverseMap();
        }
	}
}

