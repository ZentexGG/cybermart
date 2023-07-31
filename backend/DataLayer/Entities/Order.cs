using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DataLayer.Entities;

public class Order
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public bool CardPayment { get; set; }
    [Required]
    public List<OrderProduct> OrderProducts { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string? Region { get; set; }
        
    public string? PostalCode { get; set; }
    [Required]
    public string Country { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    public User User { get; set; }
    [JsonIgnore]
    public int UserId { get; set; }
    
}