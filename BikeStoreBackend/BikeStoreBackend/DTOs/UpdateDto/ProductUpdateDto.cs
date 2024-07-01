using System;
namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class ProductUpdateDto
	{
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int StockLevel { get; set; }

        //public string? Image { get; set; }

        public string SerialCode { get; set; } = null!;

        public int? ManufacturerId { get; set; }

        public int? CategoryId { get; set; }

    }
}

