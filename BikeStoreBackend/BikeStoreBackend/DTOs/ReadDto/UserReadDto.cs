 using System;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class UserReadDto
    { 
        public int UserId { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        //public string PasswordHash { get; set; } = null!;

        public string? PhoneNumber { get; set; }

        public UserRole? UserRole { get; set; }

        public virtual ICollection<OrderUpdateDto> Orders { get; set; } = new List<OrderUpdateDto>();
    }
}

