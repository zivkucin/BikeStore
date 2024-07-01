using System;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class ProductReadDto
	{
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int StockLevel { get; set; }

        public string? Image { get; set; }

        public string SerialCode { get; set; } = null!;

        public int? ManufacturerId { get; set; }

        public int? CategoryId { get; set; }

        public virtual ICollection<OrderItemUpdateDto> Orderitems { get; set; } = new List<OrderItemUpdateDto>();
    }
}

