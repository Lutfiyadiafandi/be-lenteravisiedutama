import { Controller, Get, Res } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAllBanner(@Res() res: Response): Promise<any> {
    try {
      const data = await this.bannerService.findAllBannerWithImage();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
