import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bundling_products' })
export class BundlingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  totalproduct: string;

  // @ManyToMany(() => ProductEntity, (product) => product.bundlings)
  // @JoinTable()
  // products: ProductEntity[];

  @Column()
  price: string;

  @Column()
  discountprice: string;

  @Column()
  detail: string;

  @Column()
  register: string;
}
