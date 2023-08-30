import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DateListService } from './dateList.service';
import { DateList } from './dateList.schema';
import { createDateDto, updateDateDto } from 'src/dto/date.dto';

@Controller('/dateList')
export class DateListController {
  constructor(private readonly dateService: DateListService) {}

  @Get()
  async getAllDate(): Promise<DateList[]> {
    return this.dateService.getAllDate();
  }

  @Post()
  async addNewDate(@Body() dateDto: createDateDto): Promise<DateList> {
    return this.dateService.addNewDate(dateDto);
  }

  @Delete(':id')
  async deleteDate(@Param() { id }: { id: string }): Promise<DateList> {
    return this.dateService.deleteDate(id);
  }

  @Patch(':id')
  async patchDate(
    @Param() { id }: { id: string },
    @Body() dto: updateDateDto,
  ): Promise<DateList> {
    return this.dateService.updateTime(id, dto);
  }
}
