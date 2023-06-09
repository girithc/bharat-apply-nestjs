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
import { ApplicationProfileDto } from './dto';
import {
  AppContactIdentityDto_Incoming,
  AppContactIdentityDto_Outgoing,
} from './dto/application-contact-identity.dto';
import {
  AppAddressDto_Incoming,
  AppAddressDto_Outgoing,
} from './dto/application-address.dto';

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
      'CONTROLLER: EDIT APPLICATION - Contact Identity : ',
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
