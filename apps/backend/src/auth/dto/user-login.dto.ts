import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', description: 'Password of the user' })
  readonly password!: string;
}
