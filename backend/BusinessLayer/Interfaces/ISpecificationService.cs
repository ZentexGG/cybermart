using BusinessLayer.Model;

namespace BusinessLayer.Interfaces;

public interface ISpecificationService
{
    Task AddSpecsForProduct(int productId, List<SpecificationDto> specs);
    Task ModifySpecsForProduct(int productId, List<SpecificationDto> newSpecs);
    Task<IEnumerable<SpecificationDto>> GetSpecsForProduct(int productId);
    
}