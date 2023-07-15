using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities;

public class ProductPhoto
{
    [Key]
    public int Id { get; set; }

    public string FileName { get; set; }

    public byte[] ImageData { get; set; }

    public DateTime UploadDate { get; set; }

    public int ProductId { get; set; }

    public Product Product { get; set; }
}