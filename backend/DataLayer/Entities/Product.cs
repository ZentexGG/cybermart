using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataLayer.Entities;

public class Product
{
    [Key] public int ID { get; set; }
    public string Name { get; set; }
    public double Price { get;set; }
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    public List<Specification> Specifications { get; set; }
    
    public List<ProductPhoto>? Photos { get; set; }
}