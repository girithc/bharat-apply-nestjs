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
import { ApplicationContactIdentityDto } from './dto/application-contact-identity.dto';

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
    @Body() dto: ApplicationContactIdentityDto,
  ) {
    console.log('CONTROLLER: EDIT APPLICATION');

    return this.applicationProfileService.editApplicationContactIdentityById(
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
}
