import { BundlingEntity } from 'src/bundling/entities/bundling.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @ManyToMany(() => BundlingEntity, (bundling) => bundling.products)
  // bundlings: BundlingEntity[];

  @Column()
  slug: string;

  @Column()
  instructor: string;

  @Column()
  time: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  discountprice: string;

  @Column()
  detail: string;

  @Column()
  register: string;
}
