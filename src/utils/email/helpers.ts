// @ts-nocheck
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { transporter } from "./config";
import logger from "../logger";

type Email = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async (params : Email) => {
  try {
    const mail = await transporter.sendMail({
      //from: '"Example Team" <team@example.com>',    // sender address
      to: params.to,                                  // list of recipients
      subject: params.subject,                        // subject line
      text: params.text,                              // plain text body
      html: params.html,                              // HTML body
    }) as SMTPTransport.SentMessageInfo;
    logger.info("Message sent: " + mail.messageId);
    // Preview URL is only available when using an Ethereal test account
    logger.info("Preview URL: " + nodemailer.getTestMessageUrl(mail));
  } catch(e) {
    logger.error("Error while sending mail:", e);
    throw(e);
  };
};