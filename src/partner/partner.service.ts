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
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/partners?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.map((image: any) => {
        const imageUrl = image.attributes.logo.data.attributes.url;
        return {
          id: image.id,
          logo: `https://strapi.lenteravisiedutama.com${imageUrl}`,
        };
      });
      return findImage;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }
}
