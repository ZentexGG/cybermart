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
            var orders = _context.Orders.Include(o => o.User)
                .Include((o) => o.OrderProducts).ThenInclude(op=>op.Product)
                .Where(o => o.UserId == userId);
            Console.WriteLine(string.Join(",", orders));
            return orders;
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
                FirstName = newOrder.FirstName,
                LastName = newOrder.LastName,
                Address = newOrder.Address,
                City = newOrder.City,
                Region = newOrder.Region,
                PostalCode = newOrder.PostalCode,
                Country = newOrder.Country,
                PhoneNumber = newOrder.PhoneNumber,
                OrderProducts = newOrder.OrderProducts.Select(op => new OrderProduct
                {
                    ProductId = op.ProductId,
                    OrderId = op.OrderId,
                    Amount = op.Amount
                }).ToList()
            };
            foreach (var orderProduct in orderEntity.OrderProducts)
            {
                var product = await _context.Products.FindAsync(orderProduct.ProductId);
                if (product != null)
                {
                    orderProduct.Product = product;
                }
                else
                {
                    // Handle the case where the product doesn't exist
                    throw new ArgumentException($"Product not found with the provided ProductId: {orderProduct.ProductId}.");
                }
            }
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