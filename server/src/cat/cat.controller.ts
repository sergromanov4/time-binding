import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './cat.schema';

@Controller('/cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async getAllCat(): Promise<Cat[]> {
    return this.catService.getAllCat();
  }

  @Get(':index')
  async getCatByIndex(@Param() params: { index: string }): Promise<Cat> {
    return this.catService.getCatByIndex(params.index);
  }

  @Post()
  async addCat(@Body() { name }: { name: string }): Promise<string[]> {
    await this.catService.addNewCat(name);

    return this.catService.getAllCat();
  }

  @Patch(':index')
  async updateCat(
    @Param() { index }: { index: string },
    @Body() { name }: { name: string },
  ): Promise<string[]> {
    await this.catService.updateNewCat(index, name);

    return this.catService.getAllCat();
  }

  @Delete(':index')
  async deleteCat(@Param() { index }: { index: string }): Promise<string[]> {
    await this.catService.deleteCat(index);

    return this.catService.getAllCat();
  }
}
