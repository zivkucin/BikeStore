using System;
using BikeStoreBackend.DTOs.UpdateDto;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class OrderReadDto
    {
        public int OrderId { get; set; }

        public int? UserId { get; set; }

        public DateOnly? OrderDate { get; set; }

        public OrderStatus? Status { get; set; }

        public int? ShippingId { get; set; }

        public decimal? TotalAmount { get; set; }

        public virtual ICollection<OrderItemUpdateDto> Orderitems { get; set; } = new List<OrderItemUpdateDto>();

        public virtual ICollection<PaymentUpdateDto> Payments { get; set;  } = new List<PaymentUpdateDto>();
    }
}

