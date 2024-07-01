using System;
namespace BikeStoreBackend.DTOs.CreateDto
{
	public class ProductDto
	{
        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int StockLevel { get; set; }

        public string SerialCode { get; set; } = null!;

        //public string? Image { get; set; }

        public int? ManufacturerId { get; set; }

        public int? CategoryId { get; set; }
    }
}

