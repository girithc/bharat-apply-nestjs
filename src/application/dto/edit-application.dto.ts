import {
  IsString,
  IsOptional,
} from 'class-validator';

export class EditApplicationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
