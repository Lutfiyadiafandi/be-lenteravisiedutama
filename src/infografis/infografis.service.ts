import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfografisEntity } from './entities/infografi.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class InfografisService {
  constructor(
    @InjectRepository(InfografisEntity)
    private infografisRepository: Repository<InfografisEntity>,
  ) {}

  async findAllInfografis(id: number) {
    return await this.infografisRepository.findOne({
      where: { id },
    });
  }

  async getImage(): Promise<any> {
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/infografis?populate=*';
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

  async findAllInfografisWithImage(id: number): Promise<InfografisEntity[]> {
    const findAllInfografis = await this.findAllInfografis(id);
    const getImage = await this.getImage();

    const merge = () => {
      return {
        ...findAllInfografis,
        ...getImage,
      };
    };
    const infografis = merge();
    return infografis;
  }
}
