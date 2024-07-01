using System;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class CategoryReadDto
	{
        public int CategoryId { get; set; }

        public string? CategoryName { get; set; }

        public virtual ICollection<ProductUpdateDto> Products { get; set; } = new List<ProductUpdateDto>();

    }
}

