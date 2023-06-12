import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ApplicationProfileService } from './application-profile.service';
import { GetUser } from '../auth/decorator';
import {
  AppFamilyDto,
  ApplicationProfileDto,
} from './dto';
import {
  AppContactIdentityDto_Incoming,
  AppContactIdentityDto_Outgoing,
} from './dto/application-contact-identity.dto';
import {
  AppAddressDto_Incoming,
  AppAddressDto_Outgoing,
} from './dto/application-address.dto';
import {
  ApplicationGradeTenDto_in,
  ApplicationGradeTenDto_out,
  ApplicationGradeTwelveDto_in,
  ApplicationGradeTwelveDto_out,
} from './dto/application-grade.dto';

@UseGuards(JwtGuard)
@Controller('application-profile')
export class ApplicationProfileController {
  constructor(
    private applicationProfileService: ApplicationProfileService,
  ) {}

  @Post()
  createApplicationProfile(
    @GetUser('id') userId: number,
    @Body() dto: ApplicationProfileDto,
  ) {
    return this.applicationProfileService.createApplication(
      userId,
      dto,
    );
  }
  @Post()
  createApplicationGrade(
    @GetUser('id') userId: number,
    @Body() dto: ApplicationGradeTenDto_out,
  ) {
    return this.applicationProfileService.createApplicationGrade(
      userId,
      dto,
    );
  }

  @Get()
  getApplicationProfiles(
    @GetUser('id') userId: number,
  ) {
    console.log(
      'getApplicationProfile Controller',
      userId,
    );
    return this.applicationProfileService.getApplicationProfiles(
      userId,
    );
  }

  @Get('grade')
  getApplicationGrades(
    @GetUser('id') userId: number,
  ) {
    return this.applicationProfileService.getApplicationGradeTen(
      userId,
    );
  }

  @Patch('grade-10/:id')
  editApplicationGradeTenById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    appGradeId: number,
    @Body() dto: ApplicationGradeTenDto_in,
  ) {
    const dto_outgoing: ApplicationGradeTenDto_out =
      new ApplicationGradeTenDto_out();
    dto_outgoing.classTenEnrollmentNo = Number(
      dto.classTenEnrollmentNo,
    );
    dto_outgoing.classTenInfoAccurate = Boolean(
      dto.classTenInfoAccurate,
    );
    dto_outgoing.classTenMarks = Number(
      dto.classTenMarks,
    );
    dto_outgoing.classTenTotalMarks = Number(
      dto.classTenTotalMarks,
    );
    dto_outgoing.classTenPassingYear = Number(
      dto.classTenPassingYear,
    );
    dto_outgoing.classTenPercentage = Number(
      dto.classTenPercentage,
    );

    dto_outgoing.classTenBoard =
      dto.classTenBoard;
    dto_outgoing.classTenExaminationCity =
      dto.classTenExaminationCity;
    dto_outgoing.classTenExaminationState =
      dto.classTenExaminationState;
    dto_outgoing.classTenGradeType =
      dto.classTenGradeType;
    dto_outgoing.classTenPassingMonth =
      dto.classTenPassingMonth;
    dto_outgoing.classTenSchoolName =
      dto.classTenSchoolName;

    return this.applicationProfileService.editApplicationGradeTen(
      userId,
      appGradeId,
      dto_outgoing,
    );
  }

  @Patch('grade-12/:id')
  editApplicationGradeTwelveById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    appGradeId: number,
    @Body() dto: ApplicationGradeTwelveDto_in,
  ) {
    const dto_outgoing: ApplicationGradeTwelveDto_out =
      new ApplicationGradeTwelveDto_out();
    dto_outgoing.classTwelveEnrollmentNo = Number(
      dto.classTwelveEnrollmentNo,
    );
    dto_outgoing.classTwelveInfoAccurate =
      Boolean(dto.classTwelveInfoAccurate);
    dto_outgoing.classTwelveMarks = Number(
      dto.classTwelveMarks,
    );
    dto_outgoing.classTwelveTotalMarks = Number(
      dto.classTwelveTotalMarks,
    );
    dto_outgoing.classTwelvePassingYear = Number(
      dto.classTwelvePassingYear,
    );
    dto_outgoing.classTwelvePercentage = Number(
      dto.classTwelvePercentage,
    );
    dto_outgoing.classTwelveBoard =
      dto.classTwelveBoard;
    dto_outgoing.classTwelveExaminationCity =
      dto.classTwelveExaminationCity;
    dto_outgoing.classTwelveExaminationState =
      dto.classTwelveExaminationState;
    dto_outgoing.classTwelveGradeType =
      dto.classTwelveGradeType;
    dto_outgoing.classTwelvePassingMonth =
      dto.classTwelvePassingMonth;
    dto_outgoing.classTwelveSchoolName =
      dto.classTwelveSchoolName;
    dto_outgoing.classTwelveSpecialization =
      dto.classTwelveSpecialization;
    dto_outgoing.classTwelveStatus =
      dto.classTwelveStatus;
    dto_outgoing.classTwelveStream =
      dto.classTwelveStream;
    dto_outgoing.classTwelveType =
      dto.classTwelveType;

    return this.applicationProfileService.editApplicationGradeTwelve(
      userId,
      appGradeId,
      dto_outgoing,
    );
  }

  @Patch('contact-identity/:id')
  editApplicationContactIdentityById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationProfileId: number,
    @Body() dto: AppContactIdentityDto_Incoming,
  ) {
    console.log(
      'CONTROLLER: EDIT APPLICATION - Address : ',
      dto,
    );
    console.log(
      'Primary Phone type: ',
      typeof dto.primaryPhone,
    );
    const dto_outgoing: AppContactIdentityDto_Outgoing =
      new AppContactIdentityDto_Outgoing();

    dto_outgoing.primaryPhone = Number(
      dto.primaryPhone,
    );
    dto_outgoing.secondaryPhone = Number(
      dto.secondaryPhone,
    );
    dto_outgoing.email = dto.email;
    dto_outgoing.agreeToCommunicationsContact =
      Boolean(dto.agreeToCommunicationsContact);
    dto_outgoing.idProof = this.stringListProcess(
      String(dto.idProof),
    );
    dto_outgoing.idProofLinks = dto.idProofLinks;

    console.log('Transform', dto_outgoing);

    return this.applicationProfileService.editApplicationContactIdentityById(
      userId,
      applicationProfileId,
      dto_outgoing,
    );
  }

  @Patch('address/:id')
  editApplicationAddressById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationProfileId: number,
    @Body() dto: AppAddressDto_Incoming,
  ) {
    console.log(
      'CONTROLLER: EDIT APPLICATION - Address : ',
      dto,
    );
    const dto_outgoing: AppAddressDto_Outgoing =
      new AppAddressDto_Outgoing();

    dto_outgoing.addressLineOne =
      dto.addressLineOne;

    dto_outgoing.addressLineTwo =
      dto.addressLineTwo;
    dto_outgoing.state = dto.state;
    dto_outgoing.city = dto.city;
    dto_outgoing.country = dto.country;
    dto_outgoing.pinCode = Number(dto.pinCode);
    dto_outgoing.agreeToCommunicationsAddress =
      Boolean(dto.agreeToCommunicationsAddress);

    console.log('Transform', dto_outgoing);

    return this.applicationProfileService.editApplicationAddressById(
      userId,
      applicationProfileId,
      dto_outgoing,
    );
  }

  @Patch('family/:id')
  editApplicationFamilyById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationProfileId: number,
    @Body() dto: AppFamilyDto,
  ) {
    console.log(
      'CONTROLLER: EDIT APPLICATION - Family : ',
      dto,
    );

    console.log('DTO Family: ', dto);

    return this.applicationProfileService.editApplicationFamilyById(
      userId,
      applicationProfileId,
      dto,
    );
  }

  @Patch(':id')
  editApplicationProfileById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationId: number,
    @Body() dto: ApplicationProfileDto,
  ) {
    console.log('CONTROLLER: EDIT APPLICATION');

    return this.applicationProfileService.editApplicationProfileById(
      userId,
      applicationId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteApplicationProfileById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationId: number,
  ) {
    return this.applicationProfileService.deleteApplicationProfileById(
      userId,
      applicationId,
    );
  }

  stringListProcess(sentence: string): string[] {
    const stringList: string[] =
      sentence.split(',');
    stringList.pop();
    console.log('String List: ', stringList);
    return stringList;
  }
}
