namespace BusinessLayer.Model;

public class OrderProductsDto
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }

    public int Amount { get; set; }
}