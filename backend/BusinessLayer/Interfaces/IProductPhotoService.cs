using BusinessLayer.Model;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Interfaces;

public interface IProductPhotoService
{
    Task Modify(int imgId, IFormFile newPhoto);
    Task Add(int productId, ProductPhotoDto newPhoto);
    Task Delete(int imgId);
}