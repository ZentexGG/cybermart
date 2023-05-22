using AutoMapper;
using BusinessLayer.Interfaces;
using DataLayer.Data;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.Service;

public class ProductService : IProductService
{
    private readonly CybermartContext _context;
    public ProductService(CybermartContext context)
    {
        _context = context;
    }

    public IEnumerable<Product> GetAllProducts()
    {
        return _context.Products
            .Include(p => p.ProductsSpecifications)
            .Include(p=>p.Category);
    }

    public IEnumerable<Product> GetFirstNumberOfProducts(int productsNum)
    {
        return _context.Products.Where(p => p.ID <= productsNum);
    }

    public Product? GetProductByID(int id)
    {
        return _context.Products.FirstOrDefault(p => p.ID == id);
    }

    public string AddProduct(Product product)
    {
        var existentCategory = _context.Categories.FirstOrDefault(category => category.Id == product.Category.Id);
        if (existentCategory != null)
        {
            product.Category = existentCategory;
        }
        else
        {
            _context.Categories.Add(product.Category);
        }

        _context.ProductsSpecifications.AddRange(product.ProductsSpecifications);
        foreach (var productProductSpecification in product.ProductsSpecifications)
        {
            productProductSpecification.ProductId = product.ID;
        }

        _context.Products.Add(product);
        _context.SaveChanges();
        return "Yes";
    }



    public string UpdateProduct(int id, Product product)
    {
        var productToUpdate = _context.Products.FirstOrDefault(p => p.ID == id);
        if (productToUpdate == null)
        {
            throw new KeyNotFoundException("The product id does not exist!");
        }

        _context.Update(product);
        _context.SaveChanges();

        return $"Successfully updated product with ID {productToUpdate.ID}";
    }

    public string DeleteProduct(int id)
    {
        var productToRemove = _context.Products.FirstOrDefault(p => p.ID == id);
        if (productToRemove == null)
        {
            throw new KeyNotFoundException("The product id does not exist!");
        }

        _context.Products.Remove(productToRemove);
        _context.SaveChanges();

        return $"Successfully deleted product with ID {productToRemove.ID}";
    }
}