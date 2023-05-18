using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models;

public class Product
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }

    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public Category Category { get; set; }
}