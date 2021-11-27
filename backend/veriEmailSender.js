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
    transport
      .sendMail({
        from: "sibo.currencybot1@gmail.com",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
              <p>Hello ${name}</p>
              <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
              <a href=https://sheltered-lowlands-78859.herokuapp.com/verification?email=${email}&code=${activeCode}> http://localhost:3000/verification/?email=${email}&code=${activeCode}</a>
              </div>`,
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

export const sendUnsubEmail = (name, email) => {
  try {
    transport
      .sendMail({
        from: "sibo.currencybot1@gmail.com",
        to: email,
        subject: "Successfully unsubscribed",
        html: `<h1>Email Confirmation</h1>
              <p>Hello ${name}</p>
              <p>You have unsubscribed successfully, thank you for your supporting.</p>
              </div>`,
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};
