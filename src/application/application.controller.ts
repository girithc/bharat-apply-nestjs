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
import { ApplicationService } from './application.service';
import { GetUser } from '../auth/decorator';
import {
  CreateApplicationDto,
  EditApplicationDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('applications')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
  ) {}
  @Post()
  createApplication(
    @GetUser('id') userId: number,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationService.createApplication(
      userId,
      dto,
    );
  }
  @Get()
  getApplications(@GetUser('id') userId: number) {
    return this.applicationService.getApplications(
      userId,
    );
  }
  @Get(':id')
  getApplicationById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationId: number,
  ) {
    return this.applicationService.getApplicationById(
      userId,
      applicationId,
    );
  }
  @Patch(':id')
  editApplicationById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationId: number,
    @Body() dto: EditApplicationDto,
  ) {
    return this.applicationService.editApplicationById(
      userId,
      applicationId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteApplicationById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    applicationId: number,
  ) {
    return this.applicationService.deleteApplicationById(
      userId,
      applicationId,
    );
  }
}
