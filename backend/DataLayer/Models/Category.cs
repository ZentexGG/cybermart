using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models;

public class Category
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }

    public string Name { get; set; }
}