using DataLayer.Entities;

namespace BusinessLayer.Model;

public class OrderDTO
{
    public int Id { get; set; }
    public List<OrderProductsDto> OrderProducts { get; set; }
    public int UserId { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string? Region { get; set; }
    public string? PostalCode { get; set; }
    public string Country { get; set; }
    public string PhoneNumber { get; set; }

}