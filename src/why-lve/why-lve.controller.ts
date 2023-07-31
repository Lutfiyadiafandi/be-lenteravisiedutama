import { Controller, Get, Param, Res } from '@nestjs/common';
import { WhyLveService } from './why-lve.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/why-lve')
export class WhyLveController {
  constructor(private readonly whyLveService: WhyLveService) {}

  @Get()
  async findAllWhyLve(@Res() res: Response): Promise<any> {
    try {
      const data = await this.whyLveService.findAllWhyLve();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.whyLveService.findOne({ id: id });
  }
}
