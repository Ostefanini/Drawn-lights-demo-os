import { PrismaClient, PrismaPg } from '@drawn-lights-game/prisma';
import { Injectable } from '@nestjs/common';

/**
 * Prisma service for integration tests
 * Uses a separate test database and cleans data between tests
 */
@Injectable()
export class PrismaTestService extends PrismaClient {
  constructor() {
    const testDatabaseUrl =
      process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;

    if (!testDatabaseUrl) {
      throw new Error('TEST_DATABASE_URL or DATABASE_URL must be set');
    }

    super({
      adapter: new PrismaPg({ connectionString: testDatabaseUrl }),
    });
  }

  /**
   * Cleans all tables in the database
   * Use in afterEach or afterAll of tests
   */
  async cleanDatabase(): Promise<void> {
    // Delete in order to respect foreign key constraints
    await this.combination.deleteMany({});
    await this.user.deleteMany({});
    await this.asset.deleteMany({});
  }

  /**
   * Completely resets the database
   * Useful for tests that require a clean state
   */
  async resetDatabase(): Promise<void> {
    await this.$transaction([
      this.combination.deleteMany({}),
      this.user.deleteMany({}),
      this.asset.deleteMany({}),
    ]);
  }
}
