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

  async findAllAbout(id: number) {
    return await this.aboutRepository.findOne({
      where: {id}
    });
  }

  async getImage(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/about?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.attributes.image.data.attributes.url;
      const imageUrl = `http://localhost:1337${findImage}`;
      return {
        image: imageUrl,
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }

  async findAllAboutWithImage(id: number): Promise<AboutEntity[]> {
    const findAbout = await this.findAllAbout(id);
    const getImage = await this.getImage();

    const merge = () => {
      return {
        ...findAbout,
        ...getImage,
      };
    };
    const about = merge();
    return about;
  }
}
