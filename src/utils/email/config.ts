import nodemailer from "nodemailer";

export const transporter = process.env.NODE_ENV === 'production' ?

nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465, //process.env.NODEMAILER_PORT,
  secure: true, //process.env.NODEMAILER_SECURE,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_PASSWORD,
  },
},
{
  from: process.env.NODEMAILER_SMTP_USER_EMAIL,
}) :

nodemailer.createTransport({
  service: "Ethereal",
  host: process.env.NODEMAILER_HOST,
  port: 587, //process.env.NODEMAILER_PORT,
  secure: false, //process.env.NODEMAILER_SECURE,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_PASSWORD,
  },
  logger: true,
  debug: false,
  transactionLog: false,
},
{
  from: process.env.NODEMAILER_SMTP_USER_EMAIL,
});