import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    // transporter config
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // email options
    const mailOptions = {
      from: `"Insurance App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // send mail
    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email could not be sent");
  }
};