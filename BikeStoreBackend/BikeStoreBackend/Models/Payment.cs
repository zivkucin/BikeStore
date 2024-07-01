using System;
using System.Collections.Generic;

namespace BikeStoreBackend.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? OrderId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public decimal? Amount { get; set; }

    public string? StripeTransactionId { get; set; }

    public virtual Order? Order { get; set; }
}
