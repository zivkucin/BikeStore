using System;
namespace BikeStoreBackend.DTOs.UpdateDto
{
	public class PaymentUpdateDto
	{
        public int PaymentId { get; set; }

        public int? OrderId { get; set; }

        public DateTime? PaymentDate { get; set; }

        public decimal? Amount { get; set; }

        public string? StripeTransactionId { get; set; }
    }
}

