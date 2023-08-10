using BusinessLayer.Model;

namespace BusinessLayer.Interfaces;

public interface IPaymentService
{
    Task<PaymentResult> ProcessPaymentAsync(PaymentRequest paymentRequest);
}