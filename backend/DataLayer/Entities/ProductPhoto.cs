using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities;

public class ProductPhoto
{
    [Key] 
    public int ID { get; set; }

    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }
    public int ProductId { get; set; }
    [ForeignKey("ProductId")] 
    public Product Product { get; set; }
}