import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnelController } from './anel.controller';
import { AnelService } from './anel.service';
import { Anel } from '../db/entities/anel.entity';

@Module({
  controllers: [AnelController],
  imports: [TypeOrmModule.forFeature([Anel])],
  providers: [AnelService],
})
export class AnelModule {}
