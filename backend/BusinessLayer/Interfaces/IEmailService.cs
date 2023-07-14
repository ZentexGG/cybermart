using BusinessLayer.Model;

namespace BusinessLayer.Interfaces;

public interface IEmailService
{
    void SendEmail(Message message);
}