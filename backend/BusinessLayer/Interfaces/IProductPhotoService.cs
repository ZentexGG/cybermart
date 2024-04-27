using BusinessLayer.Model;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Interfaces;

public interface IProductPhotoService
{
    Task<ProductPhotoDto> Modify(int imgId, IFormFile newPhoto);
    Task<ProductPhotoDto> AddSingle(int productId, IFormFile newPhoto);
    Task Delete(int imgId);
}