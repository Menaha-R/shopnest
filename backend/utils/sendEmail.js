const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;

  if (!gmailUser || !gmailPass || gmailUser === 'your_email@gmail.com' || gmailPass === 'your_email_password') {
    console.warn('Email not sent: configure GMAIL_USER and GMAIL_PASS in backend/.env. Use a Gmail app password.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const mailOptions = {
      from: `"ShopNest Support" <${gmailUser}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    return false;
  }
};

module.exports = sendEmail;
