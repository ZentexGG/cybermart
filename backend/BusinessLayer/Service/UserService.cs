using System.Text.Json;
using System.Text.Json.Serialization;
using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class UserService : IUserService
{
    private readonly IDbContext _context;

    public UserService(IDbContext context)
    {
        _context = context;
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

    public async Task UpdateUser(UserDto rUserDto, IFormFile photo)
    {
        try
        {
            // Find the user entity by email
            var user = await _context.Users
                .Include(u => u.UserPhoto) // Include UserPhoto in the query
                .FirstOrDefaultAsync(u => u.Email == rUserDto.Email);

            if (user != null)
            {
                // Update user properties from UserDto
                user.Username = rUserDto.Username;

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
}