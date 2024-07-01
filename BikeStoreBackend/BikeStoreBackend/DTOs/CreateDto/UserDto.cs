using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.CreateDto
{
	public class UserDto
	{
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string? PhoneNumber { get; set; }

        //public UserRole UserRole { get; set; }
    }
}

