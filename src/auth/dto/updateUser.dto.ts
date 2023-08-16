import { MinLength } from 'class-validator';
export class CreateUserDto {
  id?: number;
  fullName?: string;
  username?: string;
  email?: string;

  @MinLength(6)
  password?: string;
}
