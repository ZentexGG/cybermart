using System.ComponentModel.DataAnnotations;
namespace DataLayer.Entities;

public class User
{
    [Key]
    public int ID { get; set; }
    
    [Required(ErrorMessage = "Username is required")]
    public string? Username { get; set; }
    
    [EmailAddress]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
}