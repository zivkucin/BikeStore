using System;
namespace BikeStoreBackend.DTOs
{
	public class PasswordUpdateDto
	{
        public string? OldPassword { get; set; }
        public string ?NewPassword { get; set; }
    }
}

