import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CollegeService } from './college.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { College } from './dto/college.dto';

@UseGuards(JwtGuard)
@Controller('college')
export class CollegeController {
  constructor(private college: CollegeService) {}

  @Post()
  async createCollege(
    @GetUser('id') userId: number,
    @Body() dto: College,
  ) {
    console.log('UserId: ', userId);
    console.log('College Dto: ', dto);
    return await this.college.createCollege(
      userId,
      dto,
    );
  }

  @Get()
  async getCollegesByUserId(
    @GetUser('id') userId: number,
  ) {
    return await this.college.getCollegesByUserId(
      userId,
    );
  }

  @Get('all')
  async getColleges() {
    return await this.college.getColleges();
  }

  @Get(':id')
  async getCollegeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    collegeId: number,
  ) {
    console.log('College Controller ');
    console.log('UserId: ', userId);
    console.log('CollegeId', collegeId);

    return await this.college.getCollegeById(
      userId,
      collegeId,
    );
  }

  @Patch(':id')
  async editCollege(
    @GetUser('id') userId: number,
    @Body() dto: College,
    @Param('id', ParseIntPipe)
    collegeId: number,
  ) {
    return await this.college.editCollegeById(
      userId,
      collegeId,
      dto,
    );
  }

  @Delete(':id')
  async deleteCollegeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) collegeId: number,
  ) {
    console.log('College Controller');
    console.log('User Id: ', userId);
    console.log('College Id:', collegeId);
    return await this.college.deleteCollegeById(
      userId,
      collegeId,
    );
  }
}
