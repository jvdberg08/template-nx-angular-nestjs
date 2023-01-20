import { Test, TestingModule } from '@nestjs/testing';

import { ExamplesService } from './examples.service';

describe('ExamplesService', () => {
  let service: ExamplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamplesService],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    service = module.get<ExamplesService>(ExamplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
