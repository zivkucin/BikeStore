using AutoMapper;
using BikeStoreBackend.DTOs.CreateDto;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.Profiles
{
	public class UserProfile :Profile
	{
		public UserProfile()
		{
			//Source->Target
			CreateMap<User, UserDto>().ReverseMap();
			CreateMap<User, UserReadDto>();
			CreateMap<User, User>();
            CreateMap<UserUpdateDto, User>().ReverseMap();
			CreateMap<User, UserReadDto2>();

        }
	}
}

