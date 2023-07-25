import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'banners' })
export class BannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  about: string;

  @Column()
  link: string;
}
