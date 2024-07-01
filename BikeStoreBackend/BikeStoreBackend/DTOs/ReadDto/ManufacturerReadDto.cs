using System;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class ManufacturerReadDto
	{
        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; } = null!;
        public ICollection<ProductUpdateDto> Products { get; set; } = new List<ProductUpdateDto>();
    }
}

