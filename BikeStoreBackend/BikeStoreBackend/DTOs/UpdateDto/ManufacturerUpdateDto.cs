using System;
namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class ManufacturerUpdateDto
	{
        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; } = null!;
    }
}

