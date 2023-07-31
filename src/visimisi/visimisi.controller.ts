import { Controller, Get, Param, Res } from '@nestjs/common';
import { VisimisiService } from './visimisi.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/visimisi')
export class VisimisiController {
  constructor(private readonly visimisiService: VisimisiService) {}

  @Get()
  async findAllVisiMisi(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const data = await this.visimisiService.findAllVisiMisiWithImage(id);
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
