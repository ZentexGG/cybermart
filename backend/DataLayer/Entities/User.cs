using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
    [JsonIgnore]
    public UserPhoto? UserPhoto { get; set; }
}

