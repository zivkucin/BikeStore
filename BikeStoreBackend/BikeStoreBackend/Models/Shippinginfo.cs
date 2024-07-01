using System;
using System.Collections.Generic;

namespace BikeStoreBackend.Models;

public partial class Shippinginfo
{
    public int ShippingId { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public string? ZipCode { get; set; }

    public virtual ICollection<Order> Orders { get; } = new List<Order>();
}
