import { Model } from "mongoose";
import { join } from "path";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}
export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
  address: IAddress;
}
export interface userInstanceMethod {
  hashPassword(password: string): string;
}

export interface userStaticMethod extends Model<IUser> {
  hashPassword(password: string): string;
}
