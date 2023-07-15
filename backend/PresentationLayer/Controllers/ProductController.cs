using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;

[ApiController] 
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet("page/{page}")]
    public async Task<IActionResult> GetProducts(int page)
    {
        try
        {
            var products= await _service.GetProductsAsync(page);
            return Ok(products);
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = $"A server error has occured!: {e.Message}" });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromForm] int ID, [FromForm] string Name, [FromForm] double Price, [FromForm] string Description, [FromForm] int CategoryId, [FromForm] List<Specification> specifications, [FromForm] List<IFormFile> photos)
    {
        try
        {
            await _service.CreateAsync(ID, Name, Price, Description, CategoryId, specifications, photos);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = $"A server error has occurred: {e.Message}" });
        }
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var products = await _service.GetAllAsync();
            return Ok(products);
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = $"A server error has occured!: {e.Message}" });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var product = await _service.GetByIdAsync(id);
            return Ok(product);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new { message = e.Message });
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = $"A server error has occured!: {e.Message}" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await _service.DeleteAsync(id);
        return Ok();
    }

}