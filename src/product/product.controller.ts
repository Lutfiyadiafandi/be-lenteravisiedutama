import { Controller, Get, Param, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProduct(@Res() res: Response): Promise<any> {
    try {
      const data = await this.productService.findAllProductsWithImage();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }

  @Get(':slug')
  async findOneProducts(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const data = await this.productService.findOneProductsWithImage(slug);
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
