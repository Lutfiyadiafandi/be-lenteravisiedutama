import { Test, TestingModule } from '@nestjs/testing';
import { WhyLveService } from './why-lve.service';

describe('WhyLveService', () => {
  let service: WhyLveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhyLveService],
    }).compile();

    service = module.get<WhyLveService>(WhyLveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
