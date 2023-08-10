using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Interfaces;

public interface IUserService
{
    Task<UserDto> GetUser(string email);
    Task UpdateUser(UserDto rUserDto, IFormFile photo);
    Task CreateUserAsync(User user);
}