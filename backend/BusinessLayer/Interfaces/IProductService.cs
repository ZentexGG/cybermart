using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Interfaces;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync(int page = 1, int limit = 10);
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);

    Task CreateAsync(int ID, string Name, double Price, string Description, int CategoryId,
        List<Specification> specifications, List<IFormFile> photos);
    Task UpdateAsync(int id, Product product);
    Task DeleteAsync(int id);
}