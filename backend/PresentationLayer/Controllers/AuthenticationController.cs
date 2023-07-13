using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json.Serialization;
using AuthenticationService.Models;
using BusinessLayer.Interfaces;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PresentationLayer.Model;

namespace PresentationLayer.Controllers;
[Route("/Auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IEmailService _emailService ;
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;


    public AuthController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, IConfiguration configuration, IUserService userService)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _emailService = emailService;
        _configuration = configuration;
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel user, string role)
    {
        var userExists = await _userManager.FindByEmailAsync(user.Email);
        var dbUser = new User()
        {
            Email = user.Email,
            Username = user.Username
        };
        await _userService.CreateUser(dbUser);
        if (userExists!= null)
        {
            return StatusCode(StatusCodes.Status400BadRequest,
                new Response { Status = "Error", Message = "User already exists!" });
        }
        IdentityUser identityUser = new()
        {
            Email = user.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = user.Username
        };
        if (!await _roleManager.RoleExistsAsync(role))
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response { Status = "Error", Message = "The Role Doesn't exist" });
        }
        var result = await _userManager.CreateAsync(identityUser, user.Password);
        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
            new Response { Status = "Error", Message = "User failed to create" });
        }
        await _userManager.AddToRoleAsync(identityUser,role);

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
        var confirmationLink = Url.ActionLink(nameof(ConfirmEmail), "Auth", new { token, email = identityUser.Email },Request.Scheme);
        var message = new Message(new string[] { identityUser.Email! }, "Confirmation Email Link", $"<button href={confirmationLink!}>Da</button>");
        _emailService.SendEmail(message);
        
        return StatusCode(StatusCodes.Status201Created,
            new Response { Status = "Success", Message = $"User created successfully & Confirmation Email to {user} Successfully    " });
    }

    [HttpGet("TestEmail")]
    public async Task<IActionResult> TestEmail()
    {
        var message = new Message(new [] { "alexandrudanielaka47@gmail.com" }, "Test", "<button style='color:red'>Dani e smecher<button>");
        _emailService.SendEmail(message);
        return StatusCode(StatusCodes.Status201Created,
            new Response { Status = "Success", Message = "Email Sent Successfully" });
    }

    [HttpGet("confirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string token, string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response() { Status = "Error", Message = "The user doesn't exist" });
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response() { Status = "Error", Message = "The email is not confirmed" });
        }
        
        return StatusCode(StatusCodes.Status200OK,
            new Response() { Status = "Success", Message = "Email Verified Successfully" });
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginUser loginUser)
    {
        var user = await _userManager.FindByEmailAsync(loginUser.Email);
        
        if (user == null)
        {
            return Unauthorized(new {message = "User does not exist!"});
        }
        if (!await _userManager.CheckPasswordAsync(user,loginUser.Password))
        {
            return Unauthorized();
        }
        if (!user.EmailConfirmed)
        {
            return StatusCode(StatusCodes.Status401Unauthorized,
                new Response { Status = "Error", Message = "The Email hasn't been verified" });
        }
        var authClaims = new List<Claim>()
        {
            new Claim("name", user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var userRoles = await _userManager.GetRolesAsync(user);

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim("role",userRole));
        }

        var jwtToken = GetToken(authClaims, loginUser.RememberMe);

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
            expiration = jwtToken.ValidTo
        });
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims,bool rememberMe)
    {
        // var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        var authSigningKey = new byte[128 / 8]; // 128-bit key
        using (var generator = RandomNumberGenerator.Create())
        {
            generator.GetBytes(authSigningKey);
        }


        var expireTime = rememberMe ? DateTime.Now.AddDays(30) : DateTime.Now.AddHours(3);
        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: expireTime,
            claims: authClaims,
            // signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(authSigningKey),
                SecurityAlgorithms.HmacSha256));
        return token;
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([Required][FromBody] ForgotPasswordModel forgotPassword)
    {
        var user = await _userManager.FindByEmailAsync(forgotPassword.Email);
        Console.WriteLine(user);
        if (user == null)
        {
            return StatusCode(StatusCodes.Status400BadRequest,
                new Response { Status = "Error", Message = "The user doesn't exist" });
        }

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        token = WebUtility.UrlEncode(token);
        var forgotPasswordLink =
            $"http://localhost:3000/reset-password/{token}";
        UriBuilder uriBuilder = new UriBuilder("http://localhost:3000");
        uriBuilder.Path = $"/reset-password/{token}/{user.Email}";
        forgotPasswordLink = uriBuilder.ToString();
        var message = new Message(new string[] { user.Email }, "Forgot password link", forgotPasswordLink!);
        _emailService.SendEmail(message);

        return StatusCode(StatusCodes.Status200OK,
            new Response { Status = "Success", Message = $"The password change request is sent to {user.Email}" });
    }
    [HttpGet("reset-password")]
    public async Task<IActionResult> ResetPassword(string token, string email)
    {
        var model = new ResetPasswordModel { Token = token, Email = email };
        return Ok(new
        {
            model
        });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPassword)
    {
        var user = await _userManager.FindByEmailAsync(resetPassword.Email);
        if (user == null)
        {
            return StatusCode(StatusCodes.Status400BadRequest,
                new Response { Status = "Error", Message = "The user doesn't exist" });
        }

        var result =await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code,error.Description);
            }

            return Ok(ModelState);
        }
        
        return StatusCode(StatusCodes.Status200OK,
            new Response { Status = "Success", Message = $"The password change was successfull" });
    }
}