using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BusinessLayer.Service;

public class UserService : IUserService
{
    private readonly IDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IEmailService _emailService ;
    private readonly IConfiguration _configuration;

    public UserService(IDbContext context, UserManager<IdentityUser> userManager, IEmailService emailService, IConfiguration configuration)
    {
        _userManager = userManager;
        _context = context;
        _emailService = emailService;
        _configuration = configuration;
    }

    public async Task<UserDto> GetUser(string email)
    {
        Console.WriteLine(email);
        var user = await _context.Users
            .Include(u => u.UserPhoto)
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

        var userDto = new UserDto
        {
            Id = user.ID,
            Username = user.Username,
            Email = user.Email,
            ImageData = user.UserPhoto?.ImageData,
            FileName = user.UserPhoto?.FileName
        };

        return userDto;
    }

    public async Task<List<Claim>> UpdateUser(UserDto rUserDto, IFormFile photo)
    {
        try
        {
            var isUsernameExists = await _context.Users.AnyAsync(u => u.Username == rUserDto.Username);
            if (isUsernameExists)
            {
                throw new DbUpdateException("Username already exists!");
            }
            
            // Find the user entity by email
            var user = await _context.Users
                .Include(u => u.UserPhoto) // Include UserPhoto in the query
                .FirstOrDefaultAsync(u => u.Email == rUserDto.Email);

            if (user != null)
            {
                // Update user properties from UserDto
                user.Username = rUserDto.Username;
                user.Email = rUserDto.Email;
                var identityUser = await _userManager.FindByEmailAsync(user.Email);
                identityUser.UserName = user.Username;
                identityUser.NormalizedUserName = user.Username.ToUpper();
                identityUser.Email = user.Email;
                identityUser.NormalizedEmail = user.Email.ToUpper();
                await _context.SaveChangesAsync();

                if (photo != null)
                {
                    using var memoryStream = new MemoryStream();
                    await photo.CopyToAsync(memoryStream);

                    if (user.UserPhoto != null)
                    {
                        // Update existing user photo
                        user.UserPhoto.FileName = photo.FileName;
                        user.UserPhoto.ImageData = memoryStream.ToArray();
                        user.UserPhoto.UploadDate = DateTime.Now;
                    }
                    else
                    {
                        // Create a new user photo
                        var userPhoto = new UserPhoto
                        {
                            FileName = photo.FileName,
                            ImageData = memoryStream.ToArray(),
                            UploadDate = DateTime.Now,
                            UserId = user.ID // Set the foreign key value
                        };
                        _context.UserPhotos.Add(userPhoto);
                    }
                    
                }
                await _context.SaveChangesAsync();
                var authClaims = new List<Claim>
                {
                    new("id", user.ID.ToString()),
                    new("name", identityUser.UserName),
                    new("email", identityUser.Email),
                    new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };


                var userRoles = await _userManager.GetRolesAsync(identityUser);
        

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim("role",userRole));
                }

                return authClaims;
            }
            else
            {
                throw new ArgumentException("User not found");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }




    public async Task CreateUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
    
    public JwtSecurityToken GetToken(List<Claim> authClaims, bool rememberMe)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var expireTime = rememberMe ? DateTime.Now.AddDays(30) : DateTime.Now.AddHours(1);
        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: expireTime,
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        return token;
    }
}