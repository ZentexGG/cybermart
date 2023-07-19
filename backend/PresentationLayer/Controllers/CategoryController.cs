using BusinessLayer.Interfaces;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;
[ApiController]
[Route("/api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoryController(ICategoryService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var categories = _service.GetAll();
        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(Category category)
    {
        await _service.CreateCategory(category);
        return Ok(new { message = $"Successfully created new category: {category.Name}" });
    }
}