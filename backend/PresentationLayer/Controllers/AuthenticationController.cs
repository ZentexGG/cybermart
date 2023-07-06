using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Authentication.Models;
using Authentication.Models.Authentication.Login;
using AuthenticationService.Models;
using BusinessLayer.Interfaces;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace PresentationLayer.Controllers;
[Route("/Auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IEmailService _emailService ;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService,IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _emailService = emailService;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user, string role)
    {
        var userExists = await _userManager.FindByEmailAsync(user.Email);
        if (userExists!= null)
        {
            return StatusCode(StatusCodes.Status403Forbidden,
                new Response { Status = "Error", Message = "User already exists" });
        }
        IdentityUser newUser = new()
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
        var result = await _userManager.CreateAsync(newUser, user.Password);
        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
            new Response { Status = "Error", Message = "User failed to create" });
        }
        await _userManager.AddToRoleAsync(newUser,role);

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
        var confirmationLink = Url.ActionLink(nameof(ConfirmEmail), "Auth", new { token, email = newUser.Email },Request.Scheme);
        var message = new Message(new string[] { newUser.Email! }, "Confirmation Email Link", $"<a href={confirmationLink!}>Da</a>");
        _emailService.SendEmail(message);
        
        return StatusCode(StatusCodes.Status201Created,
            new Response { Status = "Success", Message = $"User created successfully & Confirmation Email to {user} Successfully    " });
    }

    [HttpGet("TestEmail")]
    public async Task<ActionResult> TestEmail()
    {
        var message = new Message(new string[] { "izabelacornea88@gmail.com" }, "Test", "<button>Dani e smecher<button>");
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
        var user = await _userManager.FindByNameAsync(loginUser.UserName);
        if (user == null)
        {
            return Unauthorized();
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
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var userRoles = await _userManager.GetRolesAsync(user);

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role,userRole));
        }

        var jwtToken = GetToken(authClaims);

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
            expiration = jwtToken.ValidTo
        });
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        return token;
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([Required] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return StatusCode(StatusCodes.Status400BadRequest,
                new Response { Status = "Error", Message = "The user doesn't exist" });
        }

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var forgotPasswordLink =
            Url.Action(nameof(ResetPassword), "Auth", new { token, email = user.Email }, Request.Scheme);
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