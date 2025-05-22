import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  number: string;

  @Column({ default: false })
  isBooked: boolean;
}
