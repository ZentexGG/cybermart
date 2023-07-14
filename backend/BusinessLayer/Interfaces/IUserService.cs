using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Interfaces;

public interface IUserService
{
    Task<UserDto> GetUser(string email);
    Task UpdateUser(string username, string email, IFormFile photo);
    Task CreateUser(User user);
}