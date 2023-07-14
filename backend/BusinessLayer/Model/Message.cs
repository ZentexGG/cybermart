﻿using MimeKit;

namespace BusinessLayer.Model;

public class Message
{
    public Message(IEnumerable<string> to,string subject, string content)
    {
        To = new List<MailboxAddress>();
        To.AddRange(to.Select(x=>new MailboxAddress("email",x)));
        Subject = subject;
        Content = content;
    }

    public List<MailboxAddress> To { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }
}