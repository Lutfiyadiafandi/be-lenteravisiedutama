import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BundlingEntity } from './entities/bundling.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class BundlingService {
  constructor(
    @InjectRepository(BundlingEntity)
    private bundlingRepository: Repository<BundlingEntity>,
  ) {}

  async findAllBundling(): Promise<BundlingEntity[]> {
    return await this.bundlingRepository.find();
  }

  async getTitleProduct(): Promise<any> {
    const baseUrl = 'http://localhost:1337/api/bundling-products?populate=*';
    try {
      const res = await axios.get(baseUrl);
      const findTitle = res.data.data.attributes.products.data.map((i: any) => {
        const titleProduct = i.attributes.title;
        console.log(titleProduct);
        return {
          id: i.id,
          title: titleProduct,
        };
      });
      return findTitle;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('failed');
    }
  }
  async findAllBundlingWithTitleProduct(): Promise<BundlingEntity[]> {
    const findAllBundling = await this.findAllBundling();
    const getTitle = await this.getTitleProduct();

    const merge = findAllBundling.map((item) => {
      const title = getTitle.find((title: any) => title.id == item.id);
      return {
        ...item,
        product: title ? title : ' ',
      };
    });
    return merge;
  }

  findOne(id: number) {
    return `This action returns a #${id} bundling`;
  }
}
