using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Model;

namespace BusinessLayer.Service
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetOrdersByUser(int userId);
        Task<IEnumerable<Order>> GetAllOrders();
        Task AddOrder(OrderDTO newOrder);
        Task RemoveOrder(int orderId);
    }
}