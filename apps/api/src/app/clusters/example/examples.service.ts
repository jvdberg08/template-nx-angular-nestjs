import { Injectable, NotFoundException } from '@nestjs/common';

import { ExampleDto } from './dto/example.dto';
import { Example } from './example.entity';
import { ExamplesRepository } from './examples.repository';

@Injectable()
export class ExamplesService {
  constructor(private readonly exampleRepository: ExamplesRepository) {}

  findAll(): Promise<Example[]> {
    return this.exampleRepository.findAll();
  }

  async create(dto: ExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(dto);
    await this.exampleRepository.persistAndFlush(example);
    return example;
  }

  async update(id: number, dto: ExampleDto): Promise<Example> {
    const example = await this.exampleRepository.findOne(id);
    if (!example) throw new NotFoundException();
    example.assign(dto);
    await this.exampleRepository.flush();
    return example;
  }

  async delete(id: number): Promise<void> {
    const exampleRef = this.exampleRepository.getReference(id);
    await this.exampleRepository.removeAndFlush(exampleRef);
  }
}
