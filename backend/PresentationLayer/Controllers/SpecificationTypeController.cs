using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;
[ApiController]
[Route("/api/specification-types")]
public class SpecificationTypeController : ControllerBase
{
    private readonly ISpecificationTypeService _service;
    public SpecificationTypeController(ISpecificationTypeService service)
    {
        _service = service;
    }
    [HttpGet("{categoryId}")]
    public async Task<IActionResult> GetByCategoryId(int categoryId)
    {
        try
        {
            var specs = await _service.GetSpecTypesByCategory(categoryId);
            return Ok(specs);
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

    [HttpPost("{categoryId}")]
    public async Task<IActionResult> CreateSpecsForCategory(int categoryId, [FromBody] SpecificationType[] specTypes)
    {
        try
        {
            await _service.CreateSpecTypesForCategory(categoryId, specTypes);
            return Ok("Created");
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