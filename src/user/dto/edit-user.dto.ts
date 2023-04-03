import {
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
