import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
// Update the import path if the file is located elsewhere, for example:
import { Slot } from '../slots/slots.entity';
// Or, if the file was missing, create 'src/slots/slot.entity.ts' with the Slot entity definition.
// Update the import path if the file is located elsewhere, for example:
import { User } from '../users/users.entity';
// Or, if the file was missing, create 'src/users/users.entity.ts' with the User entity definition.

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Slot)
  slot: Slot;

  @ManyToOne(() => User)
  user: User;

  @Column()
  time: Date;
}
