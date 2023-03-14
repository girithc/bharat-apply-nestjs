import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
