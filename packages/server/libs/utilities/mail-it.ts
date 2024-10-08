// Imports:
import nodeMailer from 'nodemailer';
import { Mail } from '../types';
import { globalConfig } from '../../app/config';
import ErrorHandler from './error-handler';
import Logger from './logs';

export default async function SendMail({
  email,
  subject,
  message,
}: Mail.OptionsArg) {
  const transporter = nodeMailer.createTransport({
    service: globalConfig.SMPT_SERVICE,
    auth: {
      user: globalConfig.SMPT_MAIL,
      pass: globalConfig.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: globalConfig.SMPT_MAIL,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions).catch((err: ErrorHandler) => {
    Logger('error', err.message);
    throw new ErrorHandler(err.message, 500);
  });
}
