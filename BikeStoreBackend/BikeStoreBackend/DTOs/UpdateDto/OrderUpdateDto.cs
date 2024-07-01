using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class OrderUpdateDto
	{
        public int OrderId { get; set; }

        public int? UserId { get; set; }

        public DateOnly? OrderDate { get; set; }

        public OrderStatus? Status { get; set; }

        public int? ShippingId { get; set; }

        public decimal? TotalAmount { get; set; }

        public virtual ICollection<OrderItemUpdateDto> Orderitems { get; set; } = new List<OrderItemUpdateDto>();
    }
}

