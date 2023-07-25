import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'infografiss' })
export class InfografisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
