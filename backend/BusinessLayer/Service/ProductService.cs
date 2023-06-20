using BusinessLayer.Interfaces;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class ProductService : IProductService
{
    private IDbContext _context;
    public ProductService(IDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product> GetByIdAsync(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.ID == id);
        if (product == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        return product;
    }

    public async Task CreateAsync(Product product)
    {
        try
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException e)
        {
            throw new ApplicationException("Failed to save due to a database error.", e);
        }
    }

    public async Task UpdateAsync(int id, Product product)
    {
        var productToUpdate = await _context.Products.FirstOrDefaultAsync(p => p.ID == id);
        if (productToUpdate == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        var properties = typeof(Product).GetProperties();
        foreach (var property in properties)
        {
            var value = property.GetValue(product);
            property.SetValue(productToUpdate, value);
        }

        _context.UpdateEntityState(productToUpdate, EntityState.Modified);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var productToDelete = await _context.Products.FirstOrDefaultAsync(p => p.ID == id);
        if (productToDelete == null)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }

        _context.Products.Remove(productToDelete);
        await _context.SaveChangesAsync();
    }
}