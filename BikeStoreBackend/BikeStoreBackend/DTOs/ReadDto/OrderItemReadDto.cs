using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class OrderItemReadDto
	{
        public int OrderItemId { get; set; }

        public int? OrderId { get; set; }

        public int? ProductId { get; set; }

        public int? Quantity { get; set; }
    }
}

