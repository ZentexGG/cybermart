using BusinessLayer.Interfaces;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class CategoryService : ICategoryService
{
    private readonly IDbContext _context;
    public CategoryService(IDbContext context)
    {
        _context = context;
    }
    public IEnumerable<Category> GetAll()
    {
        return _context.Categories;
    }

    public async Task CreateCategory(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
    }
}