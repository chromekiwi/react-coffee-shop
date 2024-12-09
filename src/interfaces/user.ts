export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  uuid: string;
}
export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetMe {
  uuid: string;
}

export interface EditMe {
  firstName: string;
  lastName: string;
  email: string;
}
