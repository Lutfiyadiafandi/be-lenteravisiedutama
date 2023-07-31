import { Controller, Get, Param, Res } from '@nestjs/common';
import { InfografisService } from './infografis.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/infografis')
export class InfografisController {
  constructor(private readonly infografisService: InfografisService) {}

  @Get()
  async findAllInfografis(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const data = await this.infografisService.findAllInfografisWithImage(id);
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
