import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'about_uses' })
export class AboutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
