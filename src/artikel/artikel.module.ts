import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { ArtikelEntity } from './entities/artikel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArtikelEntity])],
  controllers: [ArtikelController],
  providers: [ArtikelService],
})
export class ArtikelModule {}
