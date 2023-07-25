import { Module } from '@nestjs/common';
import { TestimoniService } from './testimoni.service';
import { TestimoniController } from './testimoni.controller';
import { TestimoniEntity } from './entities/testimoni.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestimoniEntity])],
  controllers: [TestimoniController],
  providers: [TestimoniService],
})
export class TestimoniModule {}
