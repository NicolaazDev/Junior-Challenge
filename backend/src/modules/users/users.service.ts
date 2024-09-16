import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserDto } from './user.dto';

import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
    const userHasExists = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    if (userHasExists) {
      throw new ConflictException('Usuário já existente');
    }

    const { id, username } = await this.usersRepository.save({
      ...user,
      id: uuidv4(),
      hashPassword: hashSync(user.password, 10),
    });

    return { id, username };
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      password: user.hashPassword,
      email: user.email,
    };
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      password: user.hashPassword,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      password: user.hashPassword,
      email: user.email,
    };
  }

  async updateUser(id: string, user: UserDto) {
    const userUpdate = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (!userUpdate) {
      throw new NotFoundException('Usuário não encontrado');
    }

    Object.assign(userUpdate, user);
    return await this.usersRepository.save(user);
  }
}
