using System.ComponentModel.DataAnnotations;
namespace DataLayer.Entities;

public class User
{
    [Key] public int ID { get; set; }
}