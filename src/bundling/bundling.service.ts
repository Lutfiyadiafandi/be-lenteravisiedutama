import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BundlingEntity } from './entities/bundling.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BundlingService {
  constructor(
    @InjectRepository(BundlingEntity)
    private bundlingRepository: Repository<BundlingEntity>,
  ) {}

  async findAllBundling(): Promise<BundlingEntity[]> {
    const bundling = await this.bundlingRepository
      .createQueryBuilder('bundling')
      .leftJoinAndSelect(
        'products_bundlings_links',
        'products_bundlings_links',
        'products_bundlings_links.bundling_product_id = bundling.id',
      )
      .leftJoinAndSelect(
        'products',
        'products',
        'products_bundlings_links.product_id = products.id',
      )
      .getRawMany();

    const outputData = [];
    const bundlingMap = new Map();

    bundling.forEach((item) => {
      const bundlingId = item.bundling_id;

      if (!bundlingMap.has(bundlingId)) {
        bundlingMap.set(bundlingId, {
          id: item.bundling_id,
          title: item.bundling_title,
          slug: item.bundling_slug,
          totalproduct: item.bundling_totalproduct,
          price: item.bundling_price,
          discountprice: item.bundling_discountprice,
          detail: item.bundling_detail,
          register: item.bundling_register,
          products: [],
        });
      }

      bundlingMap.get(bundlingId).products.push({
        products_id: item.products_id,
        products_title: item.products_title,
      });
    });

    bundlingMap.forEach((bundling) => {
      outputData.push(bundling);
    });

    return outputData;
  }
}
