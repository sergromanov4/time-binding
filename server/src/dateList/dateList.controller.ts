import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DateListService } from './dateList.service';
import { DateList } from './dateList.schema';
import { createDateDto, updateDateDto } from 'src/dto/date.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/dateList')
export class DateListController {
  constructor(private readonly dateService: DateListService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllDate(): Promise<DateList[]> {
    return this.dateService.getAllDate();
  }

  @UseGuards(AuthGuard)
  @Post()
  async addNewDate(@Body() dateDto: createDateDto): Promise<DateList> {
    return this.dateService.addNewDate(dateDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDate(@Param() { id }: { id: string }): Promise<DateList> {
    return this.dateService.deleteDate(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async patchDate(
    @Param() { id }: { id: string },
    @Body() dto: updateDateDto,
  ): Promise<DateList> {
    return this.dateService.updateTime(id, dto);
  }
}
