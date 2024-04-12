const nodemailer = require("nodemailer");

const sendemail = (email, token) => {
  console.log("good morning");

  const mailBody = {
    from: "shadaab786ali10@gmail.com",
    to: email,
    subject: "Reset password",
    html: `<p>You requested a password reset. Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>
        <h1>YOUR OTP <br></br>${token}</h1>`,
  };

  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: process.env.NODEMAILER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    port: 465,
    host: "smtp.gmail.com",
  });

  transporter
    .sendMail(mailBody)
    .then((info) => {
      console.log("Email sent:", info.response);
    })
    .catch((error) => {
      console.log("Error sending email:", error);
    });
};

module.exports = sendemail;
