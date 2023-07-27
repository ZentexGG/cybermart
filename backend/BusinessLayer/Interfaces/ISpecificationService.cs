using BusinessLayer.Model;

namespace BusinessLayer.Interfaces;

public interface ISpecificationService
{
    Task AddSpecsForProduct(int productId, List<SpecificationDto> specs);
    Task<IEnumerable<SpecificationDto>> GetSpecsForProduct(int productId);
    
}