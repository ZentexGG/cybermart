using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DataLayer.Entities;

public class OrderProduct
{
    [Key]
    public int ID { get; set; }

    [JsonIgnore]
    public Order Order { get; set; }
    [JsonIgnore]
    public int OrderId { get; set; }
    public Product Product { get; set; }
    public int ProductId { get; set; }
    
    public int Amount { get; set; }
}