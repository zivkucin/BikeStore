using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.ReadDto
{
	public class PaymentReadDto
    {
        public int PaymentId { get; set; }

        public int? OrderId { get; set; }

        public DateTime? PaymentDate { get; set; }

        public decimal? Amount { get; set; }

        public string? StripeTransactionId { get; set; }
    }
}

