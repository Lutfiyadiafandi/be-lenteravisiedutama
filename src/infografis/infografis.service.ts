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

  async findAllInfografis(): Promise<InfografisEntity[]> {
    return await this.infografisRepository.find();
  }

  async getImage(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/infografiss?populate=*';
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

  async findAllInfografisWithImage(): Promise<InfografisEntity[]> {
    const findAllInfografis = await this.findAllInfografis();
    const getImage = await this.getImage();

    const merge = findAllInfografis.map((item) => {
      const image = getImage.find((img: any) => img.id == item.id);
      return {
        ...item,
        image: image ? `http://localhost:1337${image.url}` : ' ',
      };
    });
    return merge;
  }
}
