import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const sendMail = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const to = data.to;
    const title = data.title;
    const msg = data.msg;

    const mailOptions = {
      from: gmailEmail,
      to: `${to}`,
      subject: `${title}`,
      html: `${msg}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.error(`send failed. ${e}`);
      throw new functions.https.HttpsError('internal', 'send failed');
    }
  });
