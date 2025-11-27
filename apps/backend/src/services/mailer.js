import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../middlewares/getEnvVar.js';

// mailer.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  secure: false,
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});

export async function sendMail(to, subject, html, attachmentPath) {
  return transporter.sendMail({
    from: `"IRONMASS - Sport complex" <${getEnvVar(SMTP.SMTP_FROM)}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'subscription.pdf',
        path: attachmentPath,
      },
    ],
  });
}
