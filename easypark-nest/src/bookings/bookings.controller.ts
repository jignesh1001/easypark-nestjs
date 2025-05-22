import { Controller, Post, Body, Get, Session } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  bookSlot(@Body() body: { slotId: number }, @Session() session: any) {
    const user = session.user;
    if (!user) return { message: 'Please login first' };
    return this.bookingsService.create(user.id, body.slotId);
  }

  @Get()
  getAllBookings() {
    return this.bookingsService.findAll();
  }

  @Get('me')
  getMyBookings(@Session() session: any) {
    const user = session.user;
    if (!user) return { message: 'Please login first' };
    return this.bookingsService.findByUserId(user.id);
  }
}
