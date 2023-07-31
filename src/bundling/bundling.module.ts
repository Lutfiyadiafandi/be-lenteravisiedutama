import { Module } from '@nestjs/common';
import { BundlingService } from './bundling.service';
import { BundlingController } from './bundling.controller';
import { BundlingEntity } from './entities/bundling.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BundlingEntity])],
  controllers: [BundlingController],
  providers: [BundlingService],
})
export class BundlingModule {}
