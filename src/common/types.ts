export type ContactDto = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type CallbackResult = {
  callback: () => void;
}