import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artikels' })
export class ArtikelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @Column({ name: 'created_at' })
  date: Date;
}
