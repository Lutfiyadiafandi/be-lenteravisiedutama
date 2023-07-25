import { Module } from '@nestjs/common';
import { BundlingService } from './bundling.service';
import { BundlingController } from './bundling.controller';
import { BundlingEntity } from './entities/bundling.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BundlingEntity, ProductEntity])],
  controllers: [BundlingController],
  providers: [BundlingService],
})
export class BundlingModule {}
