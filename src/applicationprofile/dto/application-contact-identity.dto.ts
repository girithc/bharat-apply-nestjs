import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class AppContactIdentityDto_Outgoing {
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

export class AppContactIdentityDto_Incoming {
  @IsString()
  @IsOptional()
  primaryPhone: string;

  @IsString()
  @IsOptional()
  secondaryPhone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  idProof: string[];

  @IsString()
  @IsOptional()
  idProofLinks: string[];

  @IsString()
  @IsOptional()
  agreeToCommunicationsContact: string;
}
