import { Test, TestingModule } from '@nestjs/testing';
import { InfografisController } from './infografis.controller';
import { InfografisService } from './infografis.service';

describe('InfografisController', () => {
  let controller: InfografisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfografisController],
      providers: [InfografisService],
    }).compile();

    controller = module.get<InfografisController>(InfografisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
