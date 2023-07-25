import { Test, TestingModule } from '@nestjs/testing';
import { BundlingService } from './bundling.service';

describe('BundlingService', () => {
  let service: BundlingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BundlingService],
    }).compile();

    service = module.get<BundlingService>(BundlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
