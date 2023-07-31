import { Controller, Get, Param, Res } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('api/partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async findAllImagePartner(@Res() res: Response): Promise<any> {
    try {
      const data = await this.partnerService.getImagePartner();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
