const nodemailer = require ("nodemailer")

// Create a transporter with your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: 'khushihere0520@gmail.com',
    pass: 'glmm izbg qkxe ugkr',
  },

});

// Function to send an email
async function sendEmail(recipientEmail,otp) {
  try {
  
    // Define email data
    const mailOptions = {
      from: 'khushihere0520@gmail.com',
      to: recipientEmail,
      subject: "OTP for singup",
      text: `hello,your otp is :${otp}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.error('Error sending email:', error);
    return false; // Email sending failed
  }
}

module.exports = {
  sendEmail,
};