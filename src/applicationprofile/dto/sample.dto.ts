import {
  IsOptional,
  IsString,
} from 'class-validator';

export class SampleDto {
  @IsOptional()
  @IsString()
  empty: string;
}
