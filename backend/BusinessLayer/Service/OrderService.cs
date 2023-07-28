using BusinessLayer.Model;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class OrderService : IOrderService
{
    private readonly IDbContext _context;
    public OrderService(IDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetOrdersByUser(int id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);
            return user.Orders;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<IEnumerable<Order>> GetAllOrders()
    {
        return await _context.Orders.ToListAsync();
    }

    public async Task AddOrder(OrderDTO newOrder)
    {
        try
        {
            var orderEntity = new Order
            {
                UserId = newOrder.UserId,
                Address = newOrder.Address,
                City = newOrder.City,
                Region = newOrder.Region,
                PostalCode = newOrder.PostalCode,
                Country = newOrder.Country,
                PhoneNumber = newOrder.PhoneNumber,
                OrderProducts = newOrder.OrderProducts.Select(op => new OrderProduct
                {
                    ProductId = op.ProductId,
                    OrderId = op.OrderId
                }).ToList()
            };

            // Add the new order to the DbContext
            _context.Orders.Add(orderEntity);

            // Save changes to the database
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            // You can rethrow the exception or handle it as needed.
            throw;
        }
    }


    public async Task RemoveOrder(int orderId)
    {
        try
        {
            // Fetch the order by its ID
            var orderToRemove = await _context.Orders.FindAsync(orderId);

            if (orderToRemove != null)
            {
                // Remove the associated order products of the order
                var associatedOrderProducts = _context.OrderProducts.Where(op => op.OrderId == orderId);
                _context.OrderProducts.RemoveRange(associatedOrderProducts);

                // Remove the order
                _context.Orders.Remove(orderToRemove);

                // Save changes to the database
                await _context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            // You can rethrow the exception or handle it as needed.
            throw;
        }
    }
}