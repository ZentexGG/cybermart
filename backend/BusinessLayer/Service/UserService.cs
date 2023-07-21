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
        Console.WriteLine(user.Email);

        var userDto = new UserDto
        {
            Id = user.ID,
            Username = user.Username,
            Email = user.Email,
            // Set other properties as needed
            ImageData = user.UserPhoto?.ImageData,
            FileName = user.UserPhoto?.FileName
        };

        return userDto;
    }

    public async Task UpdateUser(string username, string email, IFormFile photo)
    {
        try
        {
            // Save the user entity before adding related entities
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            // Extract photo data from IFormFile
            if (photo != null)
            {
                using var memoryStream = new MemoryStream();
                await photo.CopyToAsync(memoryStream);

                var userPhoto = new UserPhoto
                {
                    FileName = photo.FileName,
                    ImageData = memoryStream.ToArray(),
                    UploadDate = DateTime.Now,
                    UserId = user.ID // Set the foreign key value
                };
                _context.UserPhotos.Add(userPhoto);
                await _context.SaveChangesAsync();
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