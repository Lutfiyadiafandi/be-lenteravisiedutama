import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WhyLveEntity } from './entities/why-lve.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WhyLveService {
  constructor(
    @InjectRepository(WhyLveEntity)
    private whylveRepository: Repository<WhyLveEntity>,
  ) {}

  async findAllWhyLve(): Promise<WhyLveEntity[]> {
    return await this.whylveRepository.find();
  }

  async findOne({ id: id }) {
    return await this.whylveRepository.findOne({
      where: { id },
    });
  }
}
