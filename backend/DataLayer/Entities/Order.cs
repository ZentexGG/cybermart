using System.ComponentModel.DataAnnotations;

namespace DataLayer.Entities;

public class Order
{
    [Key]
    public int Id { get; set; }
    [Required]
    public List<Product> Products { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string Region { get; set; }
        
    public string? PostalCode { get; set; }
    [Required]
    public string Country { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
       
}