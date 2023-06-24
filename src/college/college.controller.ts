import {
  Body,
  Controller,
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
  createCollege(
    @GetUser('id') userId: number,
    @Body() dto: College,
  ) {
    console.log('UserId: ', userId);
    console.log('College Dto: ', dto);
    return this.college.createCollege(
      userId,
      dto,
    );
  }
}
