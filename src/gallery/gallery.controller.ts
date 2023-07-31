import { Controller, Get, Res } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async findAllImageGallery(@Res() res: Response): Promise<any> {
    try {
      const data = await this.galleryService.getImageGallery();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
