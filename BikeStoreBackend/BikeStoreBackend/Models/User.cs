using System;
using System.Collections.Generic;

namespace BikeStoreBackend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public UserRole UserRole { get; set; }

    public virtual ICollection<Order> Orders { get; } = new List<Order>();

}
