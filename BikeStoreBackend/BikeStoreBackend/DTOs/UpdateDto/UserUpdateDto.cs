﻿using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class UserUpdateDto
	{
        public int UserId { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        //public string PasswordHash { get; set; } = null!;

        public string? PhoneNumber { get; set; }

        public UserRole? UserRole { get; set; }
    }
}
