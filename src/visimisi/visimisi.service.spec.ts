import { Test, TestingModule } from '@nestjs/testing';
import { VisimisiService } from './visimisi.service';

describe('VisimisiService', () => {
  let service: VisimisiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisimisiService],
    }).compile();

    service = module.get<VisimisiService>(VisimisiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
