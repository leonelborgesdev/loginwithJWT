const nodemailer = require("nodemailer");

const sendEmailresetPass = async (email, subject, text) => {
  console.log("SendMail", email, subject, text);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "loguinwithjwt@gmail.com", // generated ethereal user
        pass: "kxztvsoaqzezigsc", // generated ethereal password
      },
    });

    const isSend = await transporter.sendMail({
      from: "loguinwithjwt@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log(isSend);
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmailresetPass;
