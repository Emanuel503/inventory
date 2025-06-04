export interface PasswordChangedEmailParams {
  username: string;
  names: string;
  surnames: string;
  email: string;
}

export interface CreatedUserEmailParams {
  username: string;
  names: string;
  surnames: string;
  email: string;
  password: string;
}