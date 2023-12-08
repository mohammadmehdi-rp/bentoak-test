import { Exclude, Transform } from "class-transformer";
import {
  Equals,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  Length,
} from "class-validator";

export class UserLogin {
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

export class UserRegistration {
  @Length(3, 20)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}
