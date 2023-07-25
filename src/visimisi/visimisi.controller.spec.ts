import { Test, TestingModule } from '@nestjs/testing';
import { VisimisiController } from './visimisi.controller';
import { VisimisiService } from './visimisi.service';

describe('VisimisiController', () => {
  let controller: VisimisiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisimisiController],
      providers: [VisimisiService],
    }).compile();

    controller = module.get<VisimisiController>(VisimisiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
