import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Global setup: Reset database before tests
 * Ensures a clean slate for each test run
 */
async function globalSetup() {
  console.log('\n🧹 Cleaning up test database before tests...');

  try {
    // Recreate postgres container to clear tmpfs
    const command =
      'dotenv -e .env.test -- docker compose -f docker-compose.tests.yml up -d postgres-test migrate-test --force-recreate';

    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes('done')) {
      console.warn('⚠️  Warnings during reset:', stderr);
    }

    console.log('✅ Database reset completed');
  } catch (error) {
    console.error('❌ Failed to reset database:', error);
    throw error; // Fail the test run if setup fails
  }
}

export default globalSetup;
