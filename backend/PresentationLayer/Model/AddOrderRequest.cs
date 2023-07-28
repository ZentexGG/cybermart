using BusinessLayer.Model;
using DataLayer.Entities;

namespace PresentationLayer.Models
{
    public class AddOrderRequest
    {
        public OrderDTO NewOrder { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }
}
