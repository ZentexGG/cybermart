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

    public async Task<Category> GetById(int id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.ID == id);
        if (category == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        return category;
    }

    public async Task Create(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var categoryToDelete = await _context.Categories.FirstOrDefaultAsync(c => c.ID == id);
        if (categoryToDelete == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        _context.Categories.Remove(categoryToDelete);
        await _context.SaveChangesAsync();
        
    }

    public async Task Update(int id, Category category)
    {
        var categoryToUpdate = await _context.Categories.FirstOrDefaultAsync(c => c.ID == id);
        if (categoryToUpdate == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        var properties = typeof(Category).GetProperties();
        foreach (var property in properties)
        {
            var value = property.GetValue(category);
            property.SetValue(categoryToUpdate, value);
        }
        
        _context.UpdateEntityState(categoryToUpdate, EntityState.Modified);
        await _context.SaveChangesAsync();
    }
}