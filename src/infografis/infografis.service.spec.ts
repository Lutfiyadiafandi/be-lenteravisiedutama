import { Test, TestingModule } from '@nestjs/testing';
import { InfografisService } from './infografis.service';

describe('InfografisService', () => {
  let service: InfografisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfografisService],
    }).compile();

    service = module.get<InfografisService>(InfografisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
