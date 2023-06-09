import {
  IsString,
  IsOptional,
} from 'class-validator';

export class AppFamilyDto {
  @IsString()
  @IsOptional()
  fathersTitle: string;

  @IsString()
  @IsOptional()
  fathersFirstName: string;

  @IsString()
  @IsOptional()
  fathersLastName: string;

  @IsOptional()
  fathersDateOfBirth: any;

  @IsString()
  @IsOptional()
  mothersTitle: string;

  @IsString()
  @IsOptional()
  mothersFirstName: string;

  @IsString()
  @IsOptional()
  mothersLastName: string;

  @IsOptional()
  mothersDateOfBirth: any;
}
