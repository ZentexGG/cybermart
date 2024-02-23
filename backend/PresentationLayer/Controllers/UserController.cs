using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var newUserClaims = await _userService.UpdateUser(userDto, userUpdateRequest.Photo);




            var jwtToken = _userService.GetToken(newUserClaims, true);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            Response.Cookies.Append("token", tokenString);
            return Ok(new
            {
                token = tokenString,
                expiration = jwtToken.ValidTo
            });
        }
        catch (DbUpdateException e)
        {
            return StatusCode(StatusCodes.Status401Unauthorized, e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(StatusCodes.Status401Unauthorized, "An error occurred");
        }
    }
    
}