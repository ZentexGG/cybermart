using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessLayer.Model
{
    public class OrderDTO
    {
        [Required(ErrorMessage = "OrderProducts is required.")]
        public List<OrderProductsDto> OrderProducts { get; set; }

        [Required(ErrorMessage = "FirstName is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "CardPayment is required.")]
        public bool CardPayment { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "City is required.")]
        public string City { get; set; }

        // Region and PostalCode are optional, so we don't use Required here.
        public string? Region { get; set; }

        public string? PostalCode { get; set; }

        [Required(ErrorMessage = "Country is required.")]
        public string Country { get; set; }

        [Required(ErrorMessage = "PhoneNumber is required.")]
        public string PhoneNumber { get; set; }
    }
}