using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class PaymentProfile: Profile
	{
		public PaymentProfile()
		{
			CreateMap<Payment, PaymentDto>().ReverseMap();
			CreateMap<Payment, PaymentReadDto>();
            CreateMap<PaymentUpdateDto, Payment>().ReverseMap();
            CreateMap<Payment, Payment>();
        }
	}
}

