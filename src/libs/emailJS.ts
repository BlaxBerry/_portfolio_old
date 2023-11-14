import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser";

const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

export const sendMailByEmailjs = async <T>(
  templateParams?: T,
): Promise<EmailJSResponseStatus> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams as Record<string, unknown>,
      PUBLIC_KEY,
    );
    return response;
  } catch (error) {
    return error as EmailJSResponseStatus;

    // how to fix: 412 "Gmail_API: Invalid grant. Please reconnect your Gmail account"
    // https://stackoverflow.com/questions/68463095/why-am-i-getting-error-while-adding-service-in-emailjs
  }
};
