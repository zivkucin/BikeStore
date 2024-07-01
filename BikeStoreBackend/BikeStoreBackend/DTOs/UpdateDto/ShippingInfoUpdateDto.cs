using System;
namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class ShippingInfoUpdateDto
	{
        public int ShippingId { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public string? ZipCode { get; set; }
    }
}

