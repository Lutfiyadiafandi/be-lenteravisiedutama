import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'galleries' })
export class GalleryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
