using System;
namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class OrderItemUpdateDto
	{
        public int OrderItemId { get; set; }

        public int? OrderId { get; set; }

        public int? ProductId { get; set; }

        public int? Quantity { get; set; }
    }
}

