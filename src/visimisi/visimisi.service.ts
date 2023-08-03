import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisiMisiEntity } from './entities/visimisi.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class VisimisiService {
  constructor(
    @InjectRepository(VisiMisiEntity)
    private visimisiRepository: Repository<VisiMisiEntity>,
  ) {}

  async findAllVisiMisi(id: number) {
    return await this.visimisiRepository.findOne({
      where: { id },
    });
  }

  async getImage(): Promise<any> {
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/visi-misi?populate=*';
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

  async findAllVisiMisiWithImage(id: number): Promise<VisiMisiEntity[]> {
    const findAllVisiMisi = await this.findAllVisiMisi(id);
    const getImage = await this.getImage();

    const merge = () => {
      return {
        ...findAllVisiMisi,
        ...getImage,
      };
    };
    const visimisi = merge();
    return visimisi;
  }
}
