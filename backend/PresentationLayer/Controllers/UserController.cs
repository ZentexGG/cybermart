using BusinessLayer.Interfaces;
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
    public async Task<IActionResult> UpdateUser(string username, string email, IFormFile photo)
    {
        Console.WriteLine("am intrat aici");
        await _userService.UpdateUser(username, email, photo);
        return Ok();
    }

}