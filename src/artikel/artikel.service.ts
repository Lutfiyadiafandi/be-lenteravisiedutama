import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtikelEntity } from './entities/artikel.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

@Injectable()
export class ArtikelService {
  constructor(
    @InjectRepository(ArtikelEntity)
    private artikelRepository: Repository<ArtikelEntity>,
  ) {}

  async findArtikels(title: string): Promise<ArtikelEntity[]> {
    const search = await this.artikelRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });
    return search;
  }

  async findOneArtikel(slug: string) {
    return await this.artikelRepository.findOne({
      where: { slug },
    });
  }

  async getImage(): Promise<any> {
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/artikels?populate=*';
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

  async getOneImage(slug: string): Promise<any> {
    const baseUrl = `https://strapi.lenteravisiedutama.com/api/artikels/${slug}?populate=*`;
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

  // Search Artikel With Image
  async findArtikelsWithImage(title: string): Promise<ArtikelEntity[]> {
    const findArtikels = await this.findArtikels(title);
    const getImage = await this.getImage();

    const merge = findArtikels.map((item) => {
      const image = getImage.find((img: any) => img.id == item.id);
      return {
        ...item,
        image: image
          ? `https://strapi.lenteravisiedutama.com${image.url}`
          : ' ',
      };
    });
    let artikelReverse = merge.reduce((acc, curr) => [curr, ...acc], []);
    return artikelReverse;
  }

  // One Artikel With Image
  async findOneArtikelWithImage(slug: string): Promise<ArtikelEntity[]> {
    const findArtikels = await this.findOneArtikel(slug);
    const getImage = await this.getOneImage(slug);

    const merge = () => {
      return {
        ...findArtikels,
        ...getImage,
      };
    };
    const artikel = merge();
    return artikel;
  }
}
