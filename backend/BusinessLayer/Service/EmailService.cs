using AuthenticationService.Models;
using BusinessLayer.Interfaces;
using BusinessLayer.Model;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
namespace BusinessLayer.Service;

public class EmailService : IEmailService
{
    private readonly EmailConfiguration EmailConfiguration;
        
    public EmailService(EmailConfiguration emailConfiguration)
    {
        EmailConfiguration = emailConfiguration;
    }
    
    public void SendEmail(Message message)
    {
        var emailMessage = CreateEmailMessage(message);
        Send(emailMessage);
    }

    private MimeMessage CreateEmailMessage(Message message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("email",EmailConfiguration.From));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;
        emailMessage.Body = new TextPart(TextFormat.Html) { Text = message.Content };
            
        return emailMessage;
    }

    private void Send(MimeMessage emailMessage)
    {
        using var client = new SmtpClient();
        try
        {
            client.Connect(EmailConfiguration.SmtpServer,EmailConfiguration.Port,true);
            client.AuthenticationMechanisms.Remove("XOAUTH2");
            client.Authenticate(EmailConfiguration.UserName,EmailConfiguration.Password);

            client.Send(emailMessage);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}
