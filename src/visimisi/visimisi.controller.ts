import { Controller, Get, Res } from '@nestjs/common';
import { VisimisiService } from './visimisi.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('visimisi')
export class VisimisiController {
  constructor(private readonly visimisiService: VisimisiService) {}

  @Get()
  async findAllVisiMisi(@Res() res: Response): Promise<any> {
    try {
      const data = await this.visimisiService.findAllVisiMisiWithImage();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
