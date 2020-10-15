import twilio from 'twilio';

const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const token: string = process.env.TWILIO_AUTH_TOKEN || '';

const client = twilio(accountSid, token);

const from = process.env.TWILIO_NUMBER || '';

export const sendSms = (to: string, body: string) => {
  return client.messages.create({
    from,
    to,
    body,
  });
};

export const sendVerificationSMS = (to: string, key: string) => {
  sendSms(to, `Your Verification key is: ${key}`);
};
