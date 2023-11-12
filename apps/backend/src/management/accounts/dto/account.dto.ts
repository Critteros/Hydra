import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(4, 100)
  password!: string;

  @IsString()
  @IsOptional()
  name?: string;
}
