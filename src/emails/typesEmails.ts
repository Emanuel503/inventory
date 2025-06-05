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

export interface LoginEmailParams {
  username: string;
  names: string;
  surnames: string;
  email: string;
  fecha: string;
  ip: string;
  navegador: string; 
  sistema: string;
}