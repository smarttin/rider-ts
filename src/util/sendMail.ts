import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendVerificationMail = (fullName: string, address: string, key: string) => {
  const emailData: MailDataRequired = {
    from: 'rider@gmail.com',
    to: address,
    subject: `Hello! ${fullName}, please verify your email`,
    html: `Verify your email by clicking <a href="http://rider.com/verification/${key}/">here</a>`,
  };
  return sgMail.send(emailData);
};
