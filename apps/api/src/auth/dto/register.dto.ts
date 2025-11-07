import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  token!: string;

  @IsString()
  name!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
