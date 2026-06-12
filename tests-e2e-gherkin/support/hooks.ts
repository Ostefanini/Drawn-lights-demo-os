import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { After, AfterAll, Before } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { PlaywrightWorld } from './world';

const execAsync = promisify(exec);

const RESET_COMMAND =
  'dotenv -e .env.test -- docker compose -f docker-compose.tests.yml up -d postgres-test migrate-test api-nestjs-test --force-recreate';

/**
 * Before each scenario: launch a headless Chromium browser and open a fresh page.
 */
Before(async function (this: PlaywrightWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

/**
 * After each scenario: close the browser context and the browser.
 */
After(async function (this: PlaywrightWorld) {
  await this.context?.close();
  await this.browser?.close();
});

/**
 * After all features: recreate containers to leave the stack in a clean state.
 * Timeout: 3 minutes (container recreate can be slow on CI).
 */
AfterAll({ timeout: 180_000 }, async function () {
  console.log('\n🧹 [Cucumber] Resetting test database after suite...');
  try {
    const { stderr } = await execAsync(RESET_COMMAND);
    if (stderr && !stderr.includes('done')) {
      console.warn('⚠️  Warnings during teardown:', stderr);
    }
    console.log('✅ [Cucumber] Database and services reset completed');
  } catch (error) {
    console.error('❌ [Cucumber] Failed to reset database:', error);
    // Don't fail the suite if teardown fails
  }
});
