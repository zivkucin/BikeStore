using System;
using BikeStoreBackend.Models;

namespace BikeStoreBackend.DTOs.CreateDto
{
	public class PaymentDto
    { 
        public int? OrderId { get; set; }

        public DateTime? PaymentDate { get; set; }

        public decimal? Amount { get; set; }

        public string? StripeTransactionId { get; set; }
    }
}

