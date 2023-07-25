import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  // product_id: number;

  @Column()
  phonenumber: string;
  // bundling_product_id: number;

  // @Column()
  // // phonenumber: string;
  // bundling_product_order: number;

  @Column()
  // product_order: number;
  description: string;
}
