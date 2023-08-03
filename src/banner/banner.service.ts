import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';
import axios from 'axios';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private bannerRepository: Repository<BannerEntity>,
  ) {}

  async findAllBanner(id: number) {
    return await this.bannerRepository.findOne({
      where: { id },
    });
  }

  async getImage(): Promise<any> {
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/banner?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.attributes.image.data.attributes.url;
      const imageUrl = `https://strapi.lenteravisiedutama.com${findImage}`;
      return {
        image: imageUrl,
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }

  async findAllBannerWithImage(id: number): Promise<BannerEntity[]> {
    const findAllBanner = await this.findAllBanner(id);
    const getImage = await this.getImage();

    const merge = () => {
      return {
        ...findAllBanner,
        ...getImage,
      };
    };
    const banner = merge();
    return banner;
  }
}
