using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BusinessLayer.Model;
using BusinessLayer.Service;
using Stripe;

namespace PresentationLayer.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequest paymentRequest)
        {
            Console.WriteLine("Da ba am intrat");
            var paymentResult = await _paymentService.ProcessPaymentAsync(paymentRequest);

            if (paymentResult.IsSuccess)
            {
                return Ok(new { Message = paymentResult.Message });
            }

            return StatusCode(500, new { Message = paymentResult.Message });
        }
        
        [HttpPost("create-payment-method")]
        public async Task<IActionResult> CreatePaymentMethod([FromBody] CreatePaymentMethodRequest request)
        {
            StripeConfiguration.ApiKey = "sk_test_51NU9A1E7blOkcXvgGAvXPPcQ8Geoz8x11TKzh21VQf1geJIqtasUDbpd58xDrYkSmnu7a1ADr6K7bBoGUKGvrzgk00eYDT1y4o"; // Replace with your actual Stripe API key

            var options = new PaymentMethodCreateOptions
            {
                Type = "card",
                Card = new PaymentMethodCardOptions
                {
                    Token = request.Token
                }
            };

            var service = new PaymentMethodService();
            var paymentMethod = await service.CreateAsync(options);

            return Ok(new { PaymentMethodId = paymentMethod.Id });
        }

        public class CreatePaymentMethodRequest
        {
            public string Token { get; set; }
        }

    }
}