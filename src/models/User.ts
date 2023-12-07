import { IsEmail, IsStrongPassword, Length } from "class-validator";

export default class User {
  @Length(3, 20)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}
