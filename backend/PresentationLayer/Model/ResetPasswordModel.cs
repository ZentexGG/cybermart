using System.ComponentModel.DataAnnotations;

namespace Authentication.Models;

public class ResetPasswordModel
{
    [Required]
    public string Password { get; set; }
    [Compare("Password",ErrorMessage = "The password and confimation password don't match")]
    public string ConfirmPassword { get; set; }

    public string Email { get; set; }
    public string Token { get; set; }
}