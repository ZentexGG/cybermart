using DataLayer.Entities;

namespace BusinessLayer.Model;

public class ProductDto
{
    public int ID { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public int CategoryId { get; set; }
    public List<Specification> Specifications { get; set; }
    public List<ProductPhotoDto> Photos { get; set; }
}