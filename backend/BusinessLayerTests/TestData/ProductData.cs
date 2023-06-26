using DataLayer.Entities;

namespace BusinessLayerTests.TestData;

public static class ProductData
{
    public static List<Product> GetProucts()
    {
        return new List<Product>
        {
            new() { ID = 1, Name = "Intel core I5" },
            new() { ID = 2, Name = "Gaming Laptop" },
            new() { ID = 3, Name = "Gaming Chair" }
        };
    }
}