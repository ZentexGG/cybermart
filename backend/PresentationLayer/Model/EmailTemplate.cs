namespace PresentationLayer.Model;

public static class EmailTemplate
{
  public static string RegisterEmail(string url, string username)
  {
    return $@"
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cybermart - Registration Confirmation</title>
    </head>
    <body style=""font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;"">
      <table align=""center"" border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""border-collapse: collapse; background-color: #ffffff;"">
        <tr>
          <td align=""center"" bgcolor=""#007BFF"" style=""padding: 40px 0; color: #ffffff;"">
            <h1>Welcome to Cybermart</h1>
          </td>
        </tr>
        <tr>
          <td style=""padding: 30px;"">
            <h2>Dear {username},</h2>
            <p style=""font-size: 18px;"">Thank you for registering with Cybermart, your go-to online store for all things tech! We are excited to have you as part of our tech-savvy community.</p>
            <p style=""font-size: 18px;"">To ensure the security of your account, please click the button below to verify your email address:</p>
            <p style=""text-align: center;"">
              <a href=""{url}"" style=""background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 5px; display: inline-block; font-size: 18px;"">Verify Email</a>
            </p>
            <p style=""text-align: center; font-size: 18px;"">{url}</p>
            <p style=""font-size: 18px;"">Once your email address is verified, you can start exploring our vast collection of cutting-edge gadgets, electronics, and more.</p>
            <p style=""font-size: 18px;"">If you did not create an account on Cybermart, please ignore this email.</p>
            <p style=""font-size: 18px;"">Happy shopping!</p>
            <p style=""font-size: 18px;"">Sincerely,</p>
            <p style=""font-size: 18px;"">The Cybermart Team</p>
          </td>
        </tr>
        <tr>
          <td align=""center"" bgcolor=""#007BFF"" style=""padding: 20px 0; color: #ffffff;"">
            <p style=""font-size: 18px;"">© 2023 Cybermart. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ";
  }
  
  public static string ForgotPasswordEmail(string resetPasswordLink, string userName)
  {
    return $@"
<!DOCTYPE html>
<html>
<head>
  <title>Cybermart - Forgot Password</title>
</head>
<body style=""font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;"">
  <table align=""center"" border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""border-collapse: collapse; background-color: #ffffff;"">
    <tr>
      <td align=""center"" bgcolor=""#007BFF"" style=""padding: 40px 0; color: #ffffff;"">
        <h1>Cybermart - Forgot Password</h1>
      </td>
    </tr>
    <tr>
      <td style=""padding: 30px;"">
        <h2>Dear {userName},</h2>
        <p style=""font-size: 18px;"">We received a request to reset your password for your Cybermart account. If you did not initiate this request, you can safely ignore this email.</p>
        <p style=""font-size: 18px;"">To reset your password, click the button below:</p>
        <p style=""text-align: center;"">
          <a href=""{resetPasswordLink}"" style=""background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 5px; display: inline-block; font-size: 18px;"">Reset Password</a>
        </p>
        <p style=""text-align: center; font-size: 18px;"">{resetPasswordLink}</p>
        <p style=""font-size: 18px;"">Please note that this link will expire in 24 hours.</p>
        <p style=""font-size: 18px;"">If you did not request a password reset, please ignore this email.</p>
        <p style=""font-size: 18px;"">Best regards,</p>
        <p style=""font-size: 18px;"">The Cybermart Team</p>
      </td>
    </tr>
    <tr>
      <td align=""center"" bgcolor=""#007BFF"" style=""padding: 20px 0; color: #ffffff;"">
        <p style=""font-size: 18px;"">© 2023 Cybermart. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
";
  }



}