using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using DataLayer.ContextInterface;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class SpecificationService : ISpecificationService
{
    private readonly IDbContext _context;
    public SpecificationService(IDbContext context)
    {
        _context = context;
    }
    
    public async Task AddSpecsForProduct(int productId, List<SpecificationDto> specs)
    {
        var productExists = await _context.Specifications.FirstOrDefaultAsync(s => s.ProductId == productId) != null;
        if (!productExists)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }
        foreach (var specDto in specs)
        {
            var spec = new Specification
            {
                ID = 0,
                ProductId = productId,
                SpecificationTypeId = specDto.SpecificationTypeId,
                Value = specDto.Value
            };
            _context.Specifications.Add(spec);
            await _context.SaveChangesAsync();

        }

    }

    public async Task<IEnumerable<SpecificationDto>> GetSpecsForProduct(int productId)
    {
        var productExists = await _context.Specifications.FirstOrDefaultAsync(s => s.ProductId == productId) != null;
        if (!productExists)
        {
            throw new KeyNotFoundException("The specified ID was not found!");
        }
        var specifications = await _context.Specifications.Where(s => s.ProductId == productId).Select(s =>
            new SpecificationDto { SpecificationTypeId = s.SpecificationTypeId, Value = s.Value }).ToListAsync();
        return specifications;
    }
}