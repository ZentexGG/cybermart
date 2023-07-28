using System.ComponentModel.DataAnnotations;

namespace DataLayer.Entities;

public class OrderProduct
{
    [Key]
    public int ID { get; set; }

    public Order Order { get; set; }
    public int OrderId { get; set; }
    public Product Product { get; set; }
    public int ProductId { get; set; }
}