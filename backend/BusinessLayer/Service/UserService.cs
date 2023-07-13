using BusinessLayer.Interfaces;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class UserService : IUserService
{
    private readonly IDbContext _context;

    public UserService(IDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUser(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        return user;
    }

    public async Task UpdateUser(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task CreateUser(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
}