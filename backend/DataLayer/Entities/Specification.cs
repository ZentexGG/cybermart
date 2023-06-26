using System.ComponentModel.DataAnnotations;

namespace DataLayer.Entities;

public class Specification
{
    [Key] public int ID { get; set; }
    public int ProductId { get; set; }
    public int SpecificationTypeId { get; set; }
    public string Value { get; set; }
    
    public Product Product { get; set; }
    public SpecificationType SpecificationType { get; set; }
}