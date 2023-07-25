import { Controller, Get, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { BaseResponseApi } from 'src/response/response';
import { Response } from 'express';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async findAllContact(@Res() res: Response): Promise<any> {
    try {
      const data = await this.contactService.findAllContact();
      const response = new BaseResponseApi<any>(true, 'success', data, res);
      return response.responseSuccess();
    } catch (error) {
      const response = new BaseResponseApi<any>(false, 'not found', error, res);
      return response.responseNotFound();
    }
  }
}
