using System;
namespace BikeStoreBackend.DTOs.CreateDto
{
	public class ShippingInfoDto
	{
        public string? Address { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public string? ZipCode { get; set; }
    }
}

