import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ExampleDto } from './dto/example.dto';
import { Example } from './example.entity';
import { ExamplesService } from './examples.service';

@Controller()
export class ExamplesController {
  constructor(private readonly exampleService: ExamplesService) {}

  @Get('examples')
  getExamples(): Promise<Example[]> {
    return this.exampleService.findAll();
  }

  @Post('examples')
  createExample(@Body() dto: ExampleDto): Promise<Example> {
    return this.exampleService.create(dto);
  }

  @Put('examples/:id')
  updateExample(
    @Param('id') id: number,
    @Body() dto: ExampleDto
  ): Promise<Example> {
    return this.exampleService.update(id, dto);
  }

  @Delete('examples/:id')
  deleteExample(@Param('id') id: number): Promise<void> {
    return this.exampleService.delete(id);
  }
}
