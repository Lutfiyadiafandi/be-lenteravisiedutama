import { Module } from '@nestjs/common';
import { InfografisService } from './infografis.service';
import { InfografisController } from './infografis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfografisEntity } from './entities/infografi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfografisEntity])],
  controllers: [InfografisController],
  providers: [InfografisService],
})
export class InfografisModule {}
