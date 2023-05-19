using AutoMapper;
using BusinessLayer.Interfaces;
using DataLayer.Data;
using DataLayer.Models;

namespace BusinessLayer.Service;

public class ProductService : IProductService
{
    private readonly CybermartContext _context;
    private readonly IMapper _mapper;
    public ProductService(CybermartContext context)
    {
        _context = context;
        var config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Product, Product>();
        });
        _mapper = config.CreateMapper();
    }

    public IEnumerable<Product> GetAllProducts()
    {
        return _context.Products;
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
        var newProduct = new Product()
        {
            Name = product.Name,
            Price = product.Price,
            Description = product.Description
        };
        var category = _context.Categories.FirstOrDefault(c => c.Name == product.Category.Name);
        if (category == null)
        {
            throw new KeyNotFoundException("Category was not found!");
        }

        newProduct.Category = category;
        _context.Products.Add(newProduct);
        _context.SaveChanges();
        return "Successfully added new product!";
    }

    public string UpdateProduct(int id, Product product)
    {
        var productToUpdate = _context.Products.FirstOrDefault(p => p.ID == id);
        if (productToUpdate == null)
        {
            throw new KeyNotFoundException("The product id does not exist!");
        }

        // _context.Update(productToUpdate);
        // Automapper to map class properties automatically
        _mapper.Map(product, productToUpdate);

        
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