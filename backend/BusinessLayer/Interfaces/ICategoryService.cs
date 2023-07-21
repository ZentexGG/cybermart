using DataLayer.Entities;

namespace BusinessLayer.Interfaces;

public interface ICategoryService
{
    IEnumerable<Category> GetAll();
    Task Create(Category category);
    Task Delete(int id);
    Task Update(int id, Category category);
}