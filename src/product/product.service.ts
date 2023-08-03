import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOneProduct(slug: string) {
    return await this.productRepository.findOne({
      where: { slug },
    });
  }

  async getImage(): Promise<any> {
    const baseUrl =
      'https://strapi.lenteravisiedutama.com/api/products?populate=*';
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
    const baseUrl = `https://strapi.lenteravisiedutama.com/api/products/${slug}?populate=*`;
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

  async findAllProductsWithImage(): Promise<ProductEntity[]> {
    const findAllProducts = await this.findAllProducts();
    const getImage = await this.getImage();

    const merge = findAllProducts.map((item) => {
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

  async findOneProductsWithImage(slug: string): Promise<ProductEntity[]> {
    const findProducts = await this.findOneProduct(slug);
    const getImage = await this.getOneImage(slug);

    const merge = () => {
      return {
        ...findProducts,
        ...getImage,
      };
    };
    const products = merge();
    return products;
  }
}
