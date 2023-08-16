using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Interfaces;

public interface IUserService
{
    Task<UserDto> GetUser(string email);
    Task<List<Claim>> UpdateUser(UserDto rUserDto, IFormFile photo);
    Task CreateUserAsync(User user);
    JwtSecurityToken GetToken(List<Claim> authClaims, bool rememberMe);
}