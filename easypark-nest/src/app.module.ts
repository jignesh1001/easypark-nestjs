import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'easypark.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    SlotsModule,
    BookingsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
