using DataLayer.Models;

namespace BusinessLayer.Interfaces;

public interface IProductService
{
    IEnumerable<Product> GetAllProducts();
    IEnumerable<Product> GetFirstNumberOfProducts(int productsNum);
    Product? GetProductByID(int id);
    string AddProduct(Product product);
    string UpdateProduct(int id, Product product);
    string DeleteProduct(int id);
}