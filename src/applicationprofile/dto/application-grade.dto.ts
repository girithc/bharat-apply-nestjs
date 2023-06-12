import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ApplicationGradeTenDto_out {
  @IsString()
  @IsOptional()
  classTenBoard: string;

  @IsString()
  @IsOptional()
  classTenExaminationState: string;

  @IsString()
  @IsOptional()
  classTenExaminationCity: string;

  @IsString()
  @IsOptional()
  classTenSchoolName: string;

  @IsNumber()
  @IsOptional()
  classTenEnrollmentNo: number;

  @IsString()
  @IsOptional()
  classTenPassingMonth: string;

  @IsNumber()
  @IsOptional()
  classTenPassingYear: number;

  @IsString()
  @IsOptional()
  classTenGradeType: string;

  @IsNumber()
  @IsOptional()
  classTenMarks: number;

  @IsNumber()
  @IsOptional()
  classTenTotalMarks: number;

  @IsNumber()
  @IsOptional()
  classTenPercentage: number;

  @IsBoolean()
  @IsOptional()
  classTenInfoAccurate: boolean;
}

export class ApplicationGradeTenDto_in {
  @IsString()
  @IsOptional()
  classTenBoard: string;

  @IsString()
  @IsOptional()
  classTenExaminationState: string;

  @IsString()
  @IsOptional()
  classTenExaminationCity: string;

  @IsString()
  @IsOptional()
  classTenSchoolName: string;

  @IsString()
  @IsOptional()
  classTenEnrollmentNo: string;

  @IsString()
  @IsOptional()
  classTenPassingMonth: string;

  @IsString()
  @IsOptional()
  classTenPassingYear: string;

  @IsString()
  @IsOptional()
  classTenGradeType: string;

  @IsString()
  @IsOptional()
  classTenMarks: string;

  @IsString()
  @IsOptional()
  classTenTotalMarks: string;

  @IsString()
  @IsOptional()
  classTenPercentage: string;

  @IsString()
  @IsOptional()
  classTenInfoAccurate: string;
}

export class ApplicationGradeTwelveDto_out {
  @IsString()
  @IsOptional()
  classTwelveType: string;

  @IsString()
  @IsOptional()
  classTwelveBoard: string;

  @IsString()
  @IsOptional()
  classTwelveStream: string;

  @IsString()
  @IsOptional()
  classTwelveStatus: string;

  @IsString()
  @IsOptional()
  classTwelveExaminationState: string;

  @IsString()
  @IsOptional()
  classTwelveExaminationCity: string;

  @IsString()
  @IsOptional()
  classTwelveSchoolName: string;

  @IsString()
  @IsOptional()
  classTwelveSpecialization: string;

  @IsNumber()
  @IsOptional()
  classTwelveEnrollmentNo: number;

  @IsString()
  @IsOptional()
  classTwelvePassingMonth: string;

  @IsNumber()
  @IsOptional()
  classTwelvePassingYear: number;

  @IsString()
  @IsOptional()
  classTwelveGradeType: string;

  @IsNumber()
  @IsOptional()
  classTwelveMarks: number;

  @IsNumber()
  @IsOptional()
  classTwelveTotalMarks: number;

  @IsNumber()
  @IsOptional()
  classTwelvePercentage: number;

  @IsBoolean()
  @IsOptional()
  classTwelveInfoAccurate: boolean;
}

export class ApplicationGradeTwelveDto_in {
  @IsString()
  @IsOptional()
  classTwelveType: string;

  @IsString()
  @IsOptional()
  classTwelveBoard: string;

  @IsString()
  @IsOptional()
  classTwelveStream: string;

  @IsString()
  @IsOptional()
  classTwelveStatus: string;

  @IsString()
  @IsOptional()
  classTwelveExaminationState: string;

  @IsString()
  @IsOptional()
  classTwelveExaminationCity: string;

  @IsString()
  @IsOptional()
  classTwelveSchoolName: string;

  @IsString()
  @IsOptional()
  classTwelveSpecialization: string;

  @IsString()
  @IsOptional()
  classTwelveEnrollmentNo: string;

  @IsString()
  @IsOptional()
  classTwelvePassingMonth: string;

  @IsString()
  @IsOptional()
  classTwelvePassingYear: string;

  @IsString()
  @IsOptional()
  classTwelveGradeType: string;

  @IsString()
  @IsOptional()
  classTwelveMarks: string;

  @IsString()
  @IsOptional()
  classTwelveTotalMarks: string;

  @IsString()
  @IsOptional()
  classTwelvePercentage: string;

  @IsString()
  @IsOptional()
  classTwelveInfoAccurate: string;
}
