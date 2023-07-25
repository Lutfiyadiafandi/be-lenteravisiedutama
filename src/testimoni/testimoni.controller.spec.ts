import { Test, TestingModule } from '@nestjs/testing';
import { TestimoniController } from './testimoni.controller';
import { TestimoniService } from './testimoni.service';

describe('TestimoniController', () => {
  let controller: TestimoniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestimoniController],
      providers: [TestimoniService],
    }).compile();

    controller = module.get<TestimoniController>(TestimoniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
