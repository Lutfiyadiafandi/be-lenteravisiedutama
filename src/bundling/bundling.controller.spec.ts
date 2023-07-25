import { Test, TestingModule } from '@nestjs/testing';
import { BundlingController } from './bundling.controller';
import { BundlingService } from './bundling.service';

describe('BundlingController', () => {
  let controller: BundlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BundlingController],
      providers: [BundlingService],
    }).compile();

    controller = module.get<BundlingController>(BundlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
