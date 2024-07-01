using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.CreateDto
{
	public class OrderDto
    {
        public int? UserId { get; set; }

        public DateOnly? OrderDate { get; set; }

        public OrderStatus? Status { get; set; }

        public int? ShippingId { get; set; }

        //public decimal? TotalAmount { get; set; }
    }
}

