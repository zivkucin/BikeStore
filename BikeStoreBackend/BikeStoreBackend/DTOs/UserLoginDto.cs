﻿using System;
namespace BikeStoreBackend.DTOs
{
	public class UserLoginDto
	{
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}

