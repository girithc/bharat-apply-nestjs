import {
  IsString,
  IsOptional,
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

  @IsOptional()
  dateOfBirth: any;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  bloodGroup: string;
}
