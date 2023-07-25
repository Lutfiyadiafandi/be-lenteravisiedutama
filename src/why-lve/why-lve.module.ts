import { Module } from '@nestjs/common';
import { WhyLveService } from './why-lve.service';
import { WhyLveController } from './why-lve.controller';
import { WhyLveEntity } from './entities/why-lve.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WhyLveEntity])],
  controllers: [WhyLveController],
  providers: [WhyLveService],
})
export class WhyLveModule {}
