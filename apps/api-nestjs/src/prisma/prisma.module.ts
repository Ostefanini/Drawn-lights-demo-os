import { Global, Module } from '@nestjs/common';
import { DatabaseSeederService } from './database-seeder.service.js';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService, DatabaseSeederService],
  exports: [PrismaService, DatabaseSeederService],
})
export class PrismaModule {}
