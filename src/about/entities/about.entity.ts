import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'abouts' })
export class AboutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
