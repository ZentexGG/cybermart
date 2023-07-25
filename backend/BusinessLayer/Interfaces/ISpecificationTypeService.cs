using DataLayer.Entities;

namespace BusinessLayer.Interfaces;

public interface ISpecificationTypeService
{
    Task<IEnumerable<SpecificationType>> GetSpecTypesByCategory(int categoryId);
    Task CreateSpecTypesForCategory(int categoryId, SpecificationType[] specTypes);
}