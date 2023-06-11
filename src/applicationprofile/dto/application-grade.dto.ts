import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


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