using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Model;

namespace BusinessLayer.Service
{
    public interface IOrderService
    {
        Task<Order> GetOrdersByOrderId(int userId);
        Task<IEnumerable<Order>> GetOrdersByUser(int orderId);
        Task<IEnumerable<Order>> GetAllOrders();
        Task AddOrder(OrderDTO newOrder);
        Task RemoveOrder(int orderId);
    }
}