export type User = {
  role?: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  __v?: number;
};

export type ActionResult = {
  success?: Boolean;
  user?: User;
  errors?: ActionErrors;
  token?: string;
};

export type ActionErrors = {
  fieldErrors?: FieldErrors;
  formErrors?: string[];
};

export type FieldErrors = {
  [x: string]: string | undefined;
  [x: number]: string | undefined;
  [x: symbol]: string | undefined;
};
