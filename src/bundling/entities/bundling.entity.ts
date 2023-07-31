import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  price: string;

  @Column()
  discountprice: string;

  @Column()
  detail: string;

  @Column()
  register: string;
}
