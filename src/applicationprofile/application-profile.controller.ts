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
import { ApplicationService } from './application-profile.service';
import { GetUser } from '../auth/decorator';
import { ApplicationProfileDto } from './dto';

@UseGuards(JwtGuard)
@Controller('application-profile')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
  ) {}
  @Post()
  createApplicationProfile(
    @GetUser('id') userId: number,
    @Body() dto: ApplicationProfileDto,
  ) {
    return this.applicationService.createApplication(
      userId,
      dto,
    );
  }
  @Get()
  getApplicationProfiles(
    @GetUser('id') userId: number,
  ) {
    return this.applicationService.getApplicationProfiles(
      userId,
    );
  }

  @Patch(':id')
  editApplicationProfileById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationId: number,
    @Body() dto: ApplicationProfileDto,
  ) {
    return this.applicationService.editApplicationProfileById(
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
    return this.applicationService.deleteApplicationProfileById(
      userId,
      applicationId,
    );
  }
}
