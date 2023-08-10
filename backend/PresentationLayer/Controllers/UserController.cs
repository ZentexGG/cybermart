using System.Text.Json;
using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers;

[Route("/User")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;


    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{email}")]
    public async Task<IActionResult> GetUser(string email)
    {
        var user = await _userService.GetUser(email);
        return Ok(user);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser([FromForm]UserUpdateRequest userUpdateRequest)
    {
        try
        {
            var userDto = userUpdateRequest.UserDto;
            var photo = userUpdateRequest.Photo;
            // Call your update method with userDto and photoFormFile
            await _userService.UpdateUser(userDto, userUpdateRequest.Photo);
            

            return Ok(userUpdateRequest);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred");
        }
    }
    
}