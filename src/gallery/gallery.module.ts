import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryEntity } from './entities/gallery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryEntity])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
