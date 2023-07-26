using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;
[ApiController] 
[Route("api/specifications")]
public class SpecificationController : ControllerBase
{
    private readonly ISpecificationService _service;

    public SpecificationController(ISpecificationService service)
    {
        _service = service;
    }

    [HttpPost("{productId}")]
    public async Task<IActionResult> AddSpecsForProductId(int productId, List<SpecificationDto> specifications)
    {
        try
        {
            await _service.AddSpecsForProduct(productId, specifications);
            return Ok();

        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new { message = e.Message });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
        }
    }

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetSpecsForProductId(int productId)
    {
        try
        {
            var result = await _service.GetSpecsForProduct(productId);
            return Ok(result);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new { message = e.Message });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = e.Message });
        }
    }
}