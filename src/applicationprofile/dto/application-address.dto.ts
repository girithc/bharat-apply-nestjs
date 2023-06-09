import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class AppAddressDto_Outgoing {
  @IsString()
  @IsOptional()
  addressLineOne: string;

  @IsString()
  @IsOptional()
  addressLineTwo: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsNumber()
  @IsOptional()
  pinCode: number;

  @IsBoolean()
  @IsOptional()
  agreeToCommunicationsAddress: boolean;
}

export class AppAddressDto_Incoming {
  @IsString()
  @IsOptional()
  addressLineOne: string;

  @IsString()
  @IsOptional()
  addressLineTwo: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  pinCode: string;

  @IsString()
  @IsOptional()
  agreeToCommunicationsAddress: string;
}
