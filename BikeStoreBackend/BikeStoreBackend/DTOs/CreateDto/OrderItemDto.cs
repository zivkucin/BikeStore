using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.CreateDto
{
	public class OrderItemDto
	{
        public int? OrderId { get; set; }

        public int? ProductId { get; set; }

        public int? Quantity { get; set; }
    }
}

