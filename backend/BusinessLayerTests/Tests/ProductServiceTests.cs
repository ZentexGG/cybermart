using BusinessLayer.Interfaces;
using BusinessLayer.Service;
using BusinessLayerTests.TestData;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;

namespace BusinessLayerTests.Tests;

public class ProductServiceTests
{
    private Mock<MockContext> _mockContext;
    private IProductService _productService;
    private List<Product> _products;
    [SetUp]
    public void Setup()
    {
        _products = ProductData.GetProucts();
        _mockContext = new Mock<MockContext>();
        _mockContext.Setup(context => context.Products)
            .ReturnsDbSet(_products);
        _mockContext.Setup(context => context.UpdateEntityState(It.IsAny<Product>(), It.IsAny<EntityState>()))
            .Verifiable();
        _productService = new ProductService(_mockContext.Object);
    }

    [Test]
    public async Task GetAll_ShouldReturnAllProducts()
    {
        var result = await _productService.GetAllAsync();
        var resultList = result.ToList();

        Assert.That(resultList, Is.Not.Null);
        Assert.That(resultList, Has.Count.EqualTo(_products.Count));
        Assert.That(resultList.Select(p => p.Name).SequenceEqual(_products.Select(p => p.Name)));
    }

    [Test]
    public async Task GetById_ExistingIdShouldReturnProduct()
    {
        const int id = 2;
        var result = await _productService.GetByIdAsync(id);
        var expected = _products[id - 1];
        
        Assert.That(result, Is.Not.Null);
        Assert.Multiple(() =>
        {
            Assert.That(result.Name, Is.EqualTo(expected.Name));
            Assert.That(result.ID, Is.EqualTo(expected.ID));
        });
    }

    [Test]
    public void GetById_WrongIdShouldThrowException()
    {
        const int nonExistingId = 10;
        Assert.ThrowsAsync<KeyNotFoundException>(async delegate
        {
             await _productService.GetByIdAsync(nonExistingId);
        });
    }

    // [Test]
    // public async Task Create_ShouldAddNewProduct()
    // {
    //     var newProduct = new Product { ID = 7, Name = "SSD Samsung 512GB" };
    //
    //     await _productService.CreateAsync(newProduct.ID,newProduct.Name,newProduct.Price,newProduct.Description,newProduct.CategoryId,new List<Specification>(),null);
    //     
    //     _mockContext.Verify(c => c.Products.Add(It.IsAny<Product>()), Times.Once);
    //     _mockContext.Verify(c => c.SaveChangesAsync(), Times.Once);
    // }

    [Test]
    public async Task Update_ShouldUpdateExistingProduct()
    {
        
        var existingProduct = _products[0];
        var newProduct = new Product { Name = "Gaming PC" };
        await _productService.UpdateAsync(existingProduct.ID, newProduct);
        
        _mockContext.Verify(c => c.UpdateEntityState(existingProduct, EntityState.Modified), Times.Once);
        _mockContext.Verify(c => c.SaveChangesAsync(), Times.Once);
        
    }

    [Test]
    public async Task Delete_ShouldRemoveProduct()
    {
        var productToRemove = _products[0];
        await _productService.DeleteAsync(productToRemove.ID);
        _mockContext.Verify(c => c.Products.Remove(productToRemove));
        _mockContext.Verify(c => c.SaveChangesAsync());
    }
}