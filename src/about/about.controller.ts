import { Controller, Get, Param, Res } from '@nestjs/common';
import { AboutService } from './about.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async findAllAbout(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const data = await this.aboutService.findAllAboutWithImage(id);
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
