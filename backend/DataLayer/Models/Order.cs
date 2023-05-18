using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models;

public class Order
{
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }

    public User PlacedBy { get; set; }
    public DateTime PlacedDate { get; set; }
    public double Price { get; set; }
    public string Country { get; set; }
    public string County { get; set; }
    public string City { get; set; }
    public string StreetName { get; set; }
    public string StreetNumber { get; set; }
    public int? PostalCode { get; set; }
    public string? Floor { get; set; }
    public string? Apartment { get; set; }
}