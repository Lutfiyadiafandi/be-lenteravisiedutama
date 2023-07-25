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

  async findAllBanner(): Promise<BannerEntity[]> {
    return await this.bannerRepository.find();
  }

  async getImage(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/banners?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.map((image: any) => {
        const imageUrl = image.attributes.image.data.attributes.url;
        return {
          id: image.id,
          url: imageUrl,
        };
      });
      return findImage;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }

  async findAllBannerWithImage(): Promise<BannerEntity[]> {
    const findAllBanner = await this.findAllBanner();
    const getImage = await this.getImage();

    const merge = findAllBanner.map((item) => {
      const image = getImage.find((img: any) => img.id == item.id);
      return {
        ...item,
        image: image ? `http://localhost:1337${image.url}` : ' ',
      };
    });
    return merge;
  }
}
