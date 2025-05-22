import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
  constructor(private slotsService: SlotsService) {}

  @Post()
  createSlot(@Body() body: { location: string; number: string }) {
    return this.slotsService.create(body.location, body.number);
  }

  @Get()
  getAllSlots() {
    return this.slotsService.findAll();
  }

  @Get('available')
  getAvailableSlots() {
    return this.slotsService.findAvailable();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { isBooked: boolean }) {
    return this.slotsService.updateStatus(+id, body.isBooked);
  }
}
