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
        private readonly string _stripeApiKey;

        public PaymentsController(IPaymentService paymentService, string stripeApiKey)
        {
            _paymentService = paymentService;
            _stripeApiKey = stripeApiKey;
        }

        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequest paymentRequest)
        {
            var paymentResult = await _paymentService.ProcessPaymentAsync(paymentRequest);

            return paymentResult.IsSuccess
                ? Ok(new { message = paymentResult.Message })
                : StatusCode(500, new { message = paymentResult.Message });
        }
        
        [HttpPost("create-payment-method")]
        public async Task<IActionResult> CreatePaymentMethod([FromBody] CreatePaymentMethodRequest request)
        {
            StripeConfiguration.ApiKey = _stripeApiKey;

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