import { PrismaClient, PrismaPg } from '@drawn-lights-game/prisma';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from '../common/config/environment.config.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<EnvironmentConfig['databaseUrl']>(
      'environment.databaseUrl',
    );
    super({
      adapter: new PrismaPg({ connectionString: databaseUrl! }),
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      // Test the connection with a simple query
      await this.$queryRaw`SELECT 1`;
      this.logger.log('✅ Database connected successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}
