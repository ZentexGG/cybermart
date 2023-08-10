using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace BusinessLayer.Model;

public class UserUpdateRequest
{
    [Required(ErrorMessage = "DC PLM N AI USERDTO")]
    public UserDto UserDto { get; set; }
    public IFormFile? Photo { get; set; }
}