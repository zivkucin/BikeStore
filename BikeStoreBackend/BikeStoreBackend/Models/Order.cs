using System;
using System.Collections.Generic;

namespace BikeStoreBackend.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int? UserId { get; set; }

    public DateOnly? OrderDate { get; set; }

    public OrderStatus? Status { get; set; }

    public int? ShippingId { get; set; }

    public decimal? TotalAmount { get; set; }

    public virtual ICollection<Orderitem> Orderitems { get; } = new List<Orderitem>();

    public virtual ICollection<Payment> Payments { get; } = new List<Payment>();

    public virtual Shippinginfo? Shipping { get; set; }

    public virtual User? User { get; set; }
}
