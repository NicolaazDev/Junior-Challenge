import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { Anel } from './entities/anel.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  database: configService.get<string>('DB_NAME'),
  password: configService.get<string>('DB_PASSWORD'),
  entities: [UserEntity, Anel],
  migrations: [__dirname + '/**/migrations/**.ts'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
