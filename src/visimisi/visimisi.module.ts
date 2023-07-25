import { Module } from '@nestjs/common';
import { VisimisiService } from './visimisi.service';
import { VisimisiController } from './visimisi.controller';
import { VisiMisiEntity } from './entities/visimisi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VisiMisiEntity])],
  controllers: [VisimisiController],
  providers: [VisimisiService],
})
export class VisimisiModule {}
