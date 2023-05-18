using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public string Username { get; set; }
    public string  Email { get; set; }
    public string Password { get; set; }
}