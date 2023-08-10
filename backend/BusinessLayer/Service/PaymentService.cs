using System;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using Microsoft.Extensions.Logging;
using Stripe;

namespace Backend.Services
{
    public class PaymentService : IPaymentService
    {
        public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest paymentRequest)
        {
            try
            {
                StripeConfiguration.ApiKey = "sk_test_51NU9A1E7blOkcXvgGAvXPPcQ8Geoz8x11TKzh21VQf1geJIqtasUDbpd58xDrYkSmnu7a1ADr6K7bBoGUKGvrzgk00eYDT1y4o"; // Replace with your actual Stripe API key

                var customerService = new CustomerService();
                var customer = customerService.Create(new CustomerCreateOptions(), new RequestOptions { IdempotencyKey = Guid.NewGuid().ToString() });

                var paymentMethodService = new PaymentMethodService();
                var attachOptions = new PaymentMethodAttachOptions
                {
                    Customer = customer.Id,
                };
                var attachedPaymentMethod = paymentMethodService.Attach(paymentRequest.PaymentMethodId, attachOptions);

                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(paymentRequest.Amount * 100),
                    Currency = "ron",
                    Customer = customer.Id,
                    PaymentMethod = attachedPaymentMethod.Id,
                    ConfirmationMethod = "manual",
                    Confirm = true
                };

                var service = new PaymentIntentService();
                var paymentIntent = service.Create(options);

                if (paymentIntent.Status == "succeeded")
                {
                    return new PaymentResult { IsSuccess = true, Message = paymentIntent.Status };
                }

                return new PaymentResult { IsSuccess = false, Message = $"An unexpected error occurred: {paymentIntent.Status}" };
            }
            catch (StripeException ex)
            {
                return new PaymentResult { IsSuccess = false, Message = $"Payment processing error: {ex.Message}" };
            }
            catch (Exception ex)
            {
                return new PaymentResult { IsSuccess = false, Message = $"An unexpected error occurred: {ex.Message}" };
            }
        }
    }
}
