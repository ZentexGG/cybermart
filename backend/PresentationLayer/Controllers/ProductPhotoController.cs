using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;

[ApiController]
[Route("api/product-photos")]
public class ProductPhotoController : ControllerBase
{
    private readonly IProductPhotoService _service;

    public ProductPhotoController(IProductPhotoService service)
    {
        _service = service;
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAsync(int id, [FromForm] IFormFile photo)
    {
        try
        {
            await _service.Modify(id, photo);
            return Ok("Successfully modified photo!");
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new { message = e.Message });
        }
        catch (ApplicationException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
        }
    }
}