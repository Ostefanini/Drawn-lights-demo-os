import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { environmentConfig } from './common/config/environment.config.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AssetsModule } from './ressources/assets/assets.module.js';
import { CombinationsModule } from './ressources/combinations/combinations.module.js';
import { UsersModule } from './ressources/users/users.module.js';
import { VideoModule } from './ressources/video/video.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfig],
      ignoreEnvFile:
        process.env.NODE_ENV === 'test' ||
        process.env.NODE_ENV === 'production',
      envFilePath: '../../.env.dev.local',
    }),
    PrismaModule,
    AssetsModule,
    CombinationsModule,
    UsersModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
