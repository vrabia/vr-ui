import { Address } from "@shared/models/user.model";

export interface Credentials {
  username?: string;
  password: string;
  email?: string;
}

export interface RegisterCredentials {
  name: string;
  password: string;
  email: string;
  birthdate: string;
  about: string;
  genre: string;
  address: Address;
}
