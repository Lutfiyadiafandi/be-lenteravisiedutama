import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestimoniEntity } from './entities/testimoni.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class TestimoniService {
  constructor(
    @InjectRepository(TestimoniEntity)
    private testimoniRepository: Repository<TestimoniEntity>,
  ) {}

  async findAllTestimonis(): Promise<TestimoniEntity[]> {
    return await this.testimoniRepository.find();
  }

  async getImage(): Promise<any> {
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/testimonis?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.map((image: any) => {
        const imageUrl = image.attributes.profile.data.attributes.url;
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

  async findAllTestimonisWithImage(): Promise<TestimoniEntity[]> {
    const findAllTestimonis = await this.findAllTestimonis();
    const getImage = await this.getImage();

    const merge = findAllTestimonis.map((item) => {
      const image = getImage.find((img: any) => img.id == item.id);
      return {
        ...item,
        image: image
          ? `https://strapi.lenteravisiedutama.com${image.url}`
          : ' ',
      };
    });
    return merge;
  }
}
