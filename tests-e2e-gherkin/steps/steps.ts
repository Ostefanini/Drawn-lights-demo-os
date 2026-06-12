import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';
import {
  navigateToApp,
  populateAndWaitForAssets,
  addAssetsToPlaylist,
  selectSound,
  openValidateMenu,
  clickCompute,
  waitForSecretCombinationAlert,
  fillNickname,
  fillEmail,
  saveDiscovery,
  waitForDiscoveryRecordedNotification,
  verifySecretStatusAPI,
  parseSecretCombination,
} from '../../tests-e2e-playwright/actions/app-actions';
import { PlaywrightWorld } from '../support/world';

// ── Navigation ────────────────────────────────────────────────────────────────

Given('I open the application home page', async function (this: PlaywrightWorld) {
  await navigateToApp(this.page);
});

Then('the page URL should contain {string}', async function (this: PlaywrightWorld, expectedFragment: string) {
  const currentUrl = this.page.url();
  assert.ok(
    currentUrl.includes(expectedFragment),
    `Expected URL to contain "${expectedFragment}", but got: "${currentUrl}"`,
  );
});

// ── Assets ────────────────────────────────────────────────────────────────────

/**
 * Populate the app from the secret combination defined in FORCE_SECRET_COMBINATION env var
 * and wait for the first asset card to appear.
 */
Given('I populate the app and wait for assets to load', async function (this: PlaywrightWorld) {
  const { assets } = parseSecretCombination(process.env.FORCE_SECRET_COMBINATION);
  await populateAndWaitForAssets(this.page, assets[0]);
});

When('I add {string} to the playlist', async function (this: PlaywrightWorld, assetName: string) {
  await addAssetsToPlaylist(this.page, [assetName]);
});

/**
 * Add all assets from FORCE_SECRET_COMBINATION to the playlist at once.
 */
When('I add all secret assets to the playlist', async function (this: PlaywrightWorld) {
  const { assets } = parseSecretCombination(process.env.FORCE_SECRET_COMBINATION);
  await addAssetsToPlaylist(this.page, assets);
});

// ── Sound ─────────────────────────────────────────────────────────────────────

When('I select the {string} sound', async function (this: PlaywrightWorld, sound: string) {
  await selectSound(this.page, sound);
});

/**
 * Select the sound from FORCE_SECRET_COMBINATION.
 */
When('I select the secret sound', async function (this: PlaywrightWorld) {
  const { sound } = parseSecretCombination(process.env.FORCE_SECRET_COMBINATION);
  await selectSound(this.page, sound);
});

// ── Compute ───────────────────────────────────────────────────────────────────

When('I open the validate menu', async function (this: PlaywrightWorld) {
  await openValidateMenu(this.page);
});

When('I click compute', async function (this: PlaywrightWorld) {
  await clickCompute(this.page);
});

Then('the secret combination alert should be visible', async function (this: PlaywrightWorld) {
  await waitForSecretCombinationAlert(this.page);
});

// ── Claim prize ───────────────────────────────────────────────────────────────

When('I fill in the nickname {string}', async function (this: PlaywrightWorld, nickname: string) {
  await fillNickname(this.page, nickname);
});

When('I fill in the email {string}', async function (this: PlaywrightWorld, email: string) {
  await fillEmail(this.page, email);
});

When('I save the discovery', async function (this: PlaywrightWorld) {
  await saveDiscovery(this.page);
});

Then('the discovery recorded notification should be visible', async function (this: PlaywrightWorld) {
  await waitForDiscoveryRecordedNotification(this.page);
});

// ── API assertions ────────────────────────────────────────────────────────────

Then('the secret combination should be marked as found by {string}', async function (this: PlaywrightWorld, nickname: string) {
  await verifySecretStatusAPI(this.context.request, nickname);
});
