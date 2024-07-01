using System;
using BikeStoreBackend.DTOs.ReadDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs
{
	public class ProductResponse
	{
		public IEnumerable<ProductReadDto>? Products { get; set; }
		public int Pages { get; set; }
		public int CurrentPage { get; set; }

	}
}

