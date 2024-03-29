/* eslint-disable no-console */
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import config from '../config';

const oAuth2Client = new google
  .auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

const mailer = async (emailToSend) => {
  try {
    const transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'hdidiersharif@gmail.com',
          pass: 'jgnzbzbmojmlcaoo'
        }

      }
    );
    let template;
    let subject;
    switch (emailToSend[0]) {
      case 'sign-up':
        template = '../public/templates/signUp.ejs';
        subject = 'Email Verification';
        break;
      case 'reset-password':
        template = '../public/templates/resetPassword.ejs';
        subject = 'Reset password';
        break;
      default:
        template = '';
    }
    const data = await ejs.renderFile(path.join(__dirname, template), emailToSend[1]);

    const emailOptions = {
      from: 'hdidiersharif@gmail.com',
      to: emailToSend[2],
      subject,
      html: data
    };

    await transporter.sendMail(emailOptions);

    return 1;
  } catch (error) {
    throw error;
  }
};
export default mailer;
