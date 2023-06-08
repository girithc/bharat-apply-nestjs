import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class ApplicationContactIdentityDto {
  @IsNumber()
  @IsOptional()
  primaryPhone: number;

  @IsNumber()
  @IsOptional()
  secondaryPhone: number;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  idProof: string[];

  @IsString()
  @IsOptional()
  idUploaded: string[];

  @IsBoolean()
  @IsOptional()
  agreeToCommunications: boolean;
}
