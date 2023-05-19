using BusinessLayer.Interfaces;
using DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;

[ApiController, Route("/api/[controller]/[action]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet("/all")]
    public IEnumerable<Product> GetProducts()
    {
        return _service.GetAllProducts();
    }
    
}