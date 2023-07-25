import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'partners' })
export class PartnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
