import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Anel } from '../db/entities/anel.entity';
import { CreateAnelDto, UpdateAnelDto } from './anel.dto';

@Injectable()
export class AnelService {
  constructor(
    @InjectRepository(Anel)
    private readonly anelRepository: Repository<Anel>,
  ) {}

  async create(createAnelDto: CreateAnelDto): Promise<Anel> {
    const { forjadoPor } = createAnelDto;

    const count = await this.anelRepository.count({ where: { forjadoPor } });
    const limit = this.getAnelLimit(forjadoPor);

    if (count >= limit) {
      throw new BadRequestException(
        `${forjadoPor} não pode ter mais do que ${limit} anéis.`,
      );
    }

    const anel = this.anelRepository.create(createAnelDto);
    return this.anelRepository.save(anel);
  }

  findAll(): Promise<Anel[]> {
    return this.anelRepository.find();
  }

  async findOne(id: string): Promise<Anel> {
    const anel = await this.anelRepository.findOne({ where: { id } });
    if (!anel) {
      throw new NotFoundException(`Anel com ID ${id} não encontrado.`);
    }
    return anel;
  }

  async update(id: string, updateAnelDto: UpdateAnelDto): Promise<Anel> {
    const anel = await this.findOne(id);
    Object.assign(anel, updateAnelDto);
    return this.anelRepository.save(anel);
  }

  async remove(id: string): Promise<Anel> {
    const anel = await this.findOne(id);

    if (!anel) {
      throw new NotFoundException(`Anel com ID ${id} não encontrado.`);
    }

    return this.anelRepository.remove(anel);
  }

  private getAnelLimit(forjadoPor: string): number {
    switch (forjadoPor.toLowerCase()) {
      case 'elfos':
        return 3;
      case 'anões':
        return 7;
      case 'homens':
        return 9;
      case 'sauron':
        return 1;
      default:
        throw new BadRequestException('Forjador inválido.');
    }
  }
}
