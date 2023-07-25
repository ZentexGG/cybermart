using System.ComponentModel.DataAnnotations;

namespace DataLayer.Entities;

public class SpecificationType
{
    [Key] public int ID { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public List<Specification>? Specifications { get; set; }
}