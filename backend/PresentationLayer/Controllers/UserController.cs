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
        return Ok(_userService.GetUser(email));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(User user)
    {
        try
        {
            await _userService.UpdateUser(user);
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Conflict();
        }
    }

}