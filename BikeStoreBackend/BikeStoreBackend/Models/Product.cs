using System;
using System.Collections.Generic;

namespace BikeStoreBackend.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public int StockLevel { get; set; }

    public string SerialCode { get; set; } = null!;

    public int? ManufacturerId { get; set; }

    public string? Image { get; set; }

    public int? CategoryId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Manufacturer? Manufacturer { get; set; }

    public virtual ICollection<Orderitem> Orderitems { get; } = new List<Orderitem>();
    
}
