using BusinessLayer.Interfaces;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class SpecificationTypeService : ISpecificationTypeService
{
    private readonly IDbContext _context;
    public SpecificationTypeService(IDbContext context)
    {
        _context = context;
    }

    private async Task<bool> CheckCategory(int id)
    {
        return await _context.Categories.FirstOrDefaultAsync(c => c.ID == id) != null;
    }
    public async Task<IEnumerable<SpecificationType>> GetSpecTypesByCategory(int categoryId)
    {
        var categoryExists = await CheckCategory(categoryId);
        if (!categoryExists)
        {
            throw new KeyNotFoundException("The specified Category ID was not found!");
        }
        var specTypes = await _context.SpecificationTypes
            .Where(st => st.CategoryId == categoryId)
            .ToListAsync();
        return specTypes;
    }

    public async Task CreateSpecTypesForCategory(int categoryId, SpecificationType[] specTypes)
    {
        var categoryExists = await CheckCategory(categoryId);
        if (!categoryExists)
        {
            throw new KeyNotFoundException("The specified Category ID was not found!");
        }
        
        foreach (var spec in specTypes)
        {
            var specToAdd = new SpecificationType { CategoryId = categoryId, Name = spec.Name };
            await _context.SpecificationTypes.AddAsync(specToAdd);
        }

        await _context.SaveChangesAsync();
        
    }
}