using System;
using System.ComponentModel.DataAnnotations;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.CreateDto
{
	public class ManufacturerDto
	{
        [Required]
        public string? ManufacturerName { get; set; } 

    }
}

