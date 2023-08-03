import { Controller, Get, Param, Res } from '@nestjs/common';
import { BundlingService } from './bundling.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('bundling')
export class BundlingController {
  constructor(private readonly bundlingService: BundlingService) {}

  @Get()
  async findAllBundling(@Res() res: Response): Promise<any> {
    try {
      const data = await this.bundlingService.findAllBundling();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);

      return response.responseNotFound();
    }
  }
}
