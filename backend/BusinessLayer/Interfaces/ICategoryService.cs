using DataLayer.Entities;

namespace BusinessLayer.Interfaces;

public interface ICategoryService
{
    IEnumerable<Category> GetAll();
    Task CreateCategory(Category category);
}