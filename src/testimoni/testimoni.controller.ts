import { Controller, Get, Param, Res } from '@nestjs/common';
import { TestimoniService } from './testimoni.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/testimoni')
export class TestimoniController {
  constructor(private readonly testimoniService: TestimoniService) {}

  @Get()
  async findAllTestimoni(@Res() res: Response): Promise<any> {
    try {
      const data = await this.testimoniService.findAllTestimonisWithImage();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
