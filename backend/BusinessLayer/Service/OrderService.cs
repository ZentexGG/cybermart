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

    public async Task<Order> GetOrdersByOrderId(int OrderId)
    {
        try
        {
            // Include the Orders navigation property
            

            var order = await _context.Orders
                .Include(order => order.User)
                .Include(order => order.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(u => u.Id == OrderId);
            // If the user is not found, return an empty list or handle as needed.

            // The Orders property should now be populated with the user's orders.
            return order;
        }
        catch (Exception e)
        {
            // Handle exception
            Console.WriteLine(e);
            throw;
        }
    }
    public async Task<IEnumerable<Order>> GetOrdersByUser(int userId)
    {
        try
        {
            var user = await _context.Users
                .Include(u => u.Orders)
                .ThenInclude(order => order.OrderProducts)
                .ThenInclude(product => product.Product)
                .FirstOrDefaultAsync(u => u.ID == userId);

            if (user == null)
            {
                // Return the user's orders
                return Enumerable.Empty<Order>();
            }

            // If the user is not found, return an empty collection or null, depending on your preference.
            return user.Orders;
            // OR return null;
        }
        catch (Exception e)
        {
            // Handle exception
            Console.WriteLine(e);
            throw;
        }
    }


    public async Task<IEnumerable<Order>> GetAllOrders()
    {
        return await _context.Orders
            .Include(order => order.User)
            .Include(order => order.OrderProducts )
            .ThenInclude(op=>op.Product).ToListAsync();
    }

    public async Task AddOrder(OrderDTO newOrder)
    {
        try
        {
            // Find the existing user in the database
            var userExisting = await _context.Users
                .Include(u => u.Orders)
                .FirstOrDefaultAsync(user => user.ID == newOrder.UserId);

            if (userExisting == null)
            {
                // Handle the case where the user doesn't exist
                throw new ArgumentException("User not found with the provided UserId.");
            }

            // Create a new Order entity
            var orderEntity = new Order
            {
                Address = newOrder.Address,
                City = newOrder.City,
                Region = newOrder.Region,
                PostalCode = newOrder.PostalCode,
                Country = newOrder.Country,
                PhoneNumber = newOrder.PhoneNumber,
                OrderProducts = newOrder.OrderProducts.Select(op => new OrderProduct
                {
                    ProductId = newOrder.Id,
                    OrderId = op.OrderId,
                    Product = _context.Products.Find(op.ProductId),
                    Order = _context.Orders.Find(op.OrderId)
                }).ToList()
            };

            // Associate the order with the user
            userExisting.Orders.Add(orderEntity);

            // Save changes to the database (both Order and User)
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