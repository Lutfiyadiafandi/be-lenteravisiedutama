import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PartnerEntity } from './entities/partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}
