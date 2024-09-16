import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DbModule } from './modules/db/db.module';
import { AnelModule } from './modules/anel/anel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    DbModule,
    AnelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
