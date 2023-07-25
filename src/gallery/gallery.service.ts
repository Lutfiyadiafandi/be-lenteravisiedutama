import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { GalleryEntity } from './entities/gallery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private galleryRepository: Repository<GalleryEntity>,
  ) {}

  async getImageGallery(): Promise<any> {
    const baseUrl = 'http://127.0.0.1:1337/api/galleries?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findImage = res.data.data.map((image: any) => {
        const imageUrl = image.attributes.image.data.attributes.url;
        return {
          id: image.id,
          image: `http://localhost:1337${imageUrl}`,
        };
      });
      return findImage;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }
}
