using BusinessLayer.Interfaces;
using DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;

[ApiController, Route("/api/[controller]/")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet("all")]
    public IEnumerable<Product> GetProducts()
    {
        return _service.GetAllProducts();
    }

    [HttpGet("{id}")]
    public Product? GetProductById(int id)
    {
        return _service.GetProductByID(id);
    }

    // [HttpGet("limit/{number}")]
    // public IEnumerable<Product> GetNumberOfProducts(int number)
    // {
    //     return _service.GetFirstNumberOfProducts(number);
    // }

    [HttpPost("create")]
    public string AddProduct(Product product)
    {
        return _service.AddProduct(product);
    }

    [HttpPut("update/{id}")]
    public string UpdateProduct(int id, Product product)
    {
        return _service.UpdateProduct(id, product);
    }

    [HttpDelete("remove/{id}")]
    public string DeleteProduct(int id)
    {
        return _service.DeleteProduct(id);
    }

}