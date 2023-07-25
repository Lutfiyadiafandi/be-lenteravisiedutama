import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutEntity } from './entities/about.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutEntity)
    private aboutRepository: Repository<AboutEntity>,
  ) {}

  async findAllAbout(): Promise<AboutEntity[]> {
    return await this.aboutRepository.find();
  }

  async getImage(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/about-uses?populate=*';
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

  async findAllAboutWithImage(): Promise<AboutEntity[]> {
    const findAllAbout = await this.findAllAbout();
    const getImage = await this.getImage();

    const merge = findAllAbout.map((item) => {
      const image = getImage.find((img: any) => img.id == item.id);
      return {
        ...item,
        image: image ? `http://localhost:1337${image.url}` : ' ',
      };
    });
    return merge;
  }
}
