/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './slots.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlotsService {
  constructor(@InjectRepository(Slot) private slotRepo: Repository<Slot>) {}

  create(location: string, number: string) {
    const slot = this.slotRepo.create({ location, number });
    return this.slotRepo.save(slot);
  }

  findAll() {
    return this.slotRepo.find();
  }

  async updateStatus(id: number, isBooked: boolean) {
    const slot = await this.slotRepo.findOneBy({ id });
    if (slot) {
      slot.isBooked = isBooked;
      return this.slotRepo.save(slot);
    }
    return null;
  }

  async findAvailable() {
    return this.slotRepo.find({ where: { isBooked: false } });
  }
}
