using BusinessLayer.Model;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetSearchedProducts(string name);
    Task<IEnumerable<ProductDto>> GetProductsAsync(int page = 1, int limit = 20);
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto> GetByIdAsync(int id);

    Task<Product> CreateAsync(int ID, string Name, double Price, string Description, int CategoryId,
        List<SpecificationDto> specifications, List<IFormFile> photos);

    Task<Product> PutAsync(int ID, string Name, double Price, string Description, int CategoryId,
        List<SpecificationDto> specifications, List<IFormFile> photos);
    Task UpdateAsync(int id, Product product);
    Task DeleteAsync(int id);
    Task<int> GetProductCountAsync();
}