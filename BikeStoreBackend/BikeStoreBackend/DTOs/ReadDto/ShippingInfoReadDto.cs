using System;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class ShippingInfoReadDto
	{
        public int ShippingId { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public string? ZipCode { get; set; }

        public virtual ICollection<OrderUpdateDto> Orders { get; set; } = new List<OrderUpdateDto>();
    }
}

