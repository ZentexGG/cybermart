﻿using DataLayer.Entities;

namespace BusinessLayer.Interfaces;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync(int page = 1, int limit = 10);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);
    Task CreateAsync(Product product);
    Task UpdateAsync(int id, Product product);
    Task DeleteAsync(int id);
}