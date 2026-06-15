export interface IUser {
  name: string;
  email: string;
  password: string;
  city: string,
  country: string
}

export const UserAttributes = ["name","email","city","country","createdAt","updatedAt"]