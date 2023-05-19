import { Roles } from "@shared/models/role.enum";

export interface Address {
  country: string;
  city: string;
  zip: string;
}

export interface UserInfo extends UserDetail{
  email: string;
  roles: Roles[];
  address: Address;
  username: string;
}

export interface UserDetail  {
  id: string;
  name: string;
  birthdate: string;
  about: string;
  genre: string;
}
