import { Test, TestingModule } from '@nestjs/testing';
import { WhyLveController } from './why-lve.controller';
import { WhyLveService } from './why-lve.service';

describe('WhyLveController', () => {
  let controller: WhyLveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhyLveController],
      providers: [WhyLveService],
    }).compile();

    controller = module.get<WhyLveController>(WhyLveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
