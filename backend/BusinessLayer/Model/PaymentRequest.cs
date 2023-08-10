namespace BusinessLayer.Model;

public class PaymentRequest
{
    public decimal Amount { get; set; }
    public string PaymentMethodId { get; set; }
}