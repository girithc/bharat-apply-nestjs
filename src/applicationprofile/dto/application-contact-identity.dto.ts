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
  idProofLinks: string[];

  @IsBoolean()
  @IsOptional()
  agreeToCommunicationsContact: boolean;
}
