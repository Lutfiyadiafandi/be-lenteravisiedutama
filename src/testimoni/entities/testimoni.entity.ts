import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'testimonis' })
export class TestimoniEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  message: string;
}
