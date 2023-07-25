import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerEntity } from './entities/partner.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private partnerRepository: Repository<PartnerEntity>,
  ) {}

  async getImagePartner(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/partners?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.map((image: any) => {
        const imageUrl = image.attributes.logo.data.attributes.url;
        return {
          id: image.id,
          logo: `http://localhost:1337${imageUrl}`,
        };
      });
      return findImage;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }
}
