import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

dotenv.config();

const oauth2Client = new OAuth2(
  process.env.email_client_id, // ClientID
  process.env.email_secret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.email_refresh,
});

const refresh = async () => {
  const accessToken = await oauth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      clientId: process.env.email_client_id,
      clientSecret: process.env.email_secret,
      refreshToken: process.env.email_refresh,
      accessToken: accessToken,
      user: "sibo.currencybot2@gmail.com",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transport
};

export const sendConfirmationEmail = (name, email, activeCode) => {
  try {
    refresh()
      .sendMail({
        from: "sibo.currencybot2@gmail.com",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
              <p>Hello ${name}</p>
              <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
              <a href=https://sheltered-lowlands-78859.herokuapp.com/verification?email=${email}&code=${activeCode}> https://sheltered-lowlands-78859.herokuapp.com/verification/?email=${email}&code=${activeCode}</a>
              </div>`,
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

export const sendUnsubEmail = (name, email) => {
  try {
    refresh()
      .sendMail({
        from: "sibo.currencybot2@gmail.com",
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
