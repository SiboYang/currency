import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const password = process.env.email_password;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sibo.currencybot1@gmail.com",
    pass: password,
  },
});

export const sendConfirmationEmail = (name, email, activeCode) => {
  try {
    console.log("Check");
    transport
      .sendMail({
        from: "sibo.currencybot1@gmail.com",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
              <h2>Hello ${name}</h2>
              <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
              <a href=http://localhost:3000/verification?email=${email}&code=${activeCode}> http://localhost:3000/verification/?email=${email}&code=${activeCode}</a>
              </div>`,
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};
