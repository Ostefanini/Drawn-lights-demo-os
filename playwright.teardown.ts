import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Global teardown: Reset database after tests
 * Recreates postgres, migrations, and backend to clear tmpfs and reseed the database
 */
async function globalTeardown() {
  console.log('\n🧹 Cleaning up test database and resetting services...');

  try {
    // Recreate postgres, migrations, and backend containers
    // --force-recreate ensures the containers are removed and recreated
    // tmpfs data is automatically wiped on container destruction
    // Backend must reconnect to the fresh database
    const command =
      'dotenv -e .env.test -- docker compose -f docker-compose.tests.yml up -d postgres-test migrate-test api-nestjs-test --force-recreate';

    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes('done')) {
      console.warn('⚠️  Warnings during reset:', stderr);
    }

    console.log('✅ Database and services reset completed');
  } catch (error) {
    console.error('❌ Failed to reset database and services:', error);
    // Don't fail the test suite if cleanup fails
  }
}

export default globalTeardown;
