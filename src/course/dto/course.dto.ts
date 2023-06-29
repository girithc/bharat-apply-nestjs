import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  stream: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsOptional()
  startDate: any;

  @IsOptional()
  endDate: any;

  @IsOptional()
  admissionStartDate: any;

  @IsOptional()
  admissionEndDate: any;
}
