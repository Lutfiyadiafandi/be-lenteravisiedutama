import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'why_lves' })
export class WhyLveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
