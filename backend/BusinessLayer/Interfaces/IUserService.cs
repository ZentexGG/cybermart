using DataLayer.Entities;

namespace BusinessLayer.Interfaces;

public interface IUserService
{
    Task<User> GetUser(string email);
    Task UpdateUser(User user);

    Task CreateUser(User user);
}