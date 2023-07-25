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

  async findAllVisiMisi(): Promise<VisiMisiEntity[]> {
    return await this.visimisiRepository.find();
  }

  async getImage(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/visi-misis?populate=*';
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

  async findAllVisiMisiWithImage(): Promise<VisiMisiEntity[]> {
    const findAllVisiMisi = await this.findAllVisiMisi();
    const getImage = await this.getImage();

    const merge = findAllVisiMisi.map((item) => {
      const image = getImage.find((img: any) => img.id == item.id);
      return {
        ...item,
        image: image ? `http://localhost:1337${image.url}` : ' ',
      };
    });
    return merge;
  }
}
