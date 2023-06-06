import {
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class ApplicationProfileDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  bloodGroup: string;
}
