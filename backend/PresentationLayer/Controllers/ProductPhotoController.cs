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
    public async Task<IActionResult> PutAsync(int id, IFormFile photo)
    {
        try
        {
            var response = await _service.Modify(id, photo);
            return Ok(response);
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

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        try
        {
            await _service.Delete(id);
            return Ok($"Succesfully deleted photo: {id}");
        }
        catch (KeyNotFoundException e)
        {
            return BadRequest(new { message = e.Message });
        }
        catch (ApplicationException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{productId}")]
    public async Task<IActionResult> PostSingleAsync(int productId, IFormFile photo)
    {
        try
        {
            var res = await _service.AddSingle(productId, photo);
            return Ok(res);
        }
        catch (KeyNotFoundException e)
        {
            return BadRequest(new { message = e.Message });
        }
        catch (ApplicationException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
        }
    }
    
}