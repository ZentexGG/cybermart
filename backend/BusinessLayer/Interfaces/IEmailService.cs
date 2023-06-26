using AuthenticationService.Models;

namespace BusinessLayer.Interfaces;

public interface IEmailService
{
    void SendEmail(Message message);
}