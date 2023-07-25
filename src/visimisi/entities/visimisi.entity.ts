import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'visi_misis' })
export class VisiMisiEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
