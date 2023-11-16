type ContactFiledNames = "userName" | "emailAddress" | "contactMessage";

export interface ContactFormValue extends Record<ContactFiledNames, string> {
  userName: string;
  emailAddress: string;
  contactMessage: string;
}
