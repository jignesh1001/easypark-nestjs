/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './bookings.entity.js';
import { Repository } from 'typeorm';
import { SlotsService } from '../slots/slots.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepo: Repository<Booking>,
    private slotsService: SlotsService,
    private usersService: UsersService
  ) {}

async create(userId: number, slotId: number) {
  const slot = await this.slotsService.updateStatus(slotId, true);
  if (!slot) {
    throw new Error('Slot not found or could not be updated');
  }

  const userEntity = (await this.usersService.findAll()).find(u => u.id === userId);
  if (!userEntity?.username) {
    throw new Error('User not found or username missing');
  }
  const user = await this.usersService.findByUsername(userEntity.username);
  if (!user) {
    throw new Error('User not found');
  }

  const booking = new Booking();
//   booking.user = user;
//   booking.slot = slot;
  booking.time = new Date();

  return this.bookingsRepo.save(booking);
}

  findAll() {
    return this.bookingsRepo.find({ relations: ['user', 'slot'] });
  }

  async findByUserId(userId: number) {
    return this.bookingsRepo.find({
      where: { user: { id: userId } },
      relations: ['slot', 'user'],
    });
  }
}
