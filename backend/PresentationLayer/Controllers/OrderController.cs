using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Model;
using BusinessLayer.Service; // Include the namespace for the OrderService
using DataLayer.Entities;
using PresentationLayer.Models; // Include the namespace for the Order and OrderProduct entities

namespace PresentationLayer.Controllers
{
    [ApiController]
    [Route("api")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpGet("orders/order/{orderId}")]
        public async Task<ActionResult<Order>> GetOrderByOrderId(int orderId)
        {
            try
            {
                var order = await _orderService.GetOrdersByOrderId(orderId);
                return Ok(order);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "An error occurred while fetching orders.");
            }
        }

        [HttpGet("orders/user/{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUser(int userId)
        {
            try
            {
                var orders = await _orderService.GetOrdersByOrderId(userId);
                return Ok(orders);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "An error occurred while fetching orders.");
            }
        }

        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            try
            {
                var orders = await _orderService.GetAllOrders();
                return Ok(orders);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "An error occurred while fetching orders.");
            }
        }

        [HttpPost("orders")]
        public async Task<IActionResult> AddOrder(OrderDTO addOrderRequest)
        {
            try
            {
                await _orderService.AddOrder(addOrderRequest);
                return Ok("Order added successfully.");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "An error occurred while adding the order.");
            }
        }

        [HttpDelete("orders/{id}")]
        public async Task<IActionResult> RemoveOrder(int id)
        {
            try
            {
                await _orderService.RemoveOrder(id);
                return Ok("Order removed successfully.");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "An error occurred while removing the order.");
            }
        }
    }
}
