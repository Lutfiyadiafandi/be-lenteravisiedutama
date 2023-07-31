import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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
