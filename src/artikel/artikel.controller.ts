import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/artikel')
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Get()
  async findAllArtikel(
    @Query('title') title: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const data = await this.artikelService.findArtikelsWithImage(title);
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }

  @Get(':slug')
  async findOneArtikel(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const data = await this.artikelService.findOneArtikelWithImage(slug);
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
