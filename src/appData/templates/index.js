export const forgotPasswordEmail = `
<!DOCTYPE html>
<html>
<title>Online HTML Editor</title>
<head>
</head>
<body style=" background:#eeeeee; box-sizing:border-box">
    <div style="background:#ffffff; padding:24px; margin-top:24px; width:100%">
        <h2 style="text-align:center; margin-bottom:16px">Forgot Password</h2>
        <p>
            We recieved a request to reset password on this account.
        </p>
        <p style="margin-bottom:8px">
            To reset password please click on button below,
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" bgcolor="#fd346e">
        <a href="{{params.link}}" target="_blank" style="color: #ffffff; text-decoration: none; display: block; padding: 8px 16px;">Reset Password</a>
      </td>
    </tr>
  </table>
        <p>
            or copy and paste the below url into your browser
        </p>
        <a href="{{params.link}}">{{params.link}}</a>
    </div>
</body>
</html>
`;
