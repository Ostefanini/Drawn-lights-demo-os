import { test } from '@playwright/test';
import {
  addAssetsToPlaylist,
  clickCompute,
  fillEmail,
  fillNickname,
  navigateToApp,
  openValidateMenu,
  parseSecretCombination,
  populateAndWaitForAssets,
  saveDiscovery,
  selectSound,
  verifySecretStatusAPI,
  waitForDiscoveryRecordedNotification,
  waitForSecretCombinationAlert,
} from './actions/app-actions';

const { assets: SECRET_ASSETS, sound: SECRET_SOUND } = parseSecretCombination(
  process.env.FORCE_SECRET_COMBINATION,
);

/**
 * Happy path E2E test.
 *
 * Prerequisites:
 *  - pnpm run stack:tests:e2e-playwright (front on :3004, api on :4004)
 *  - Assets already seeded in the database
 *  - Fresh secret combination (not yet claimed) — restarting the stack resets via tmpfs
 */
test('happy path — finds the secret combination and claims the prize with an email', async ({
  page,
  request,
}) => {
  const nickname = 'E2ETester';
  const email = 'e2etester@example.com';

  await navigateToApp(page);
  await populateAndWaitForAssets(page, SECRET_ASSETS[0]);
  await addAssetsToPlaylist(page, SECRET_ASSETS);
  await selectSound(page, SECRET_SOUND);
  await openValidateMenu(page);
  await clickCompute(page);
  await waitForSecretCombinationAlert(page);
  await fillNickname(page, nickname);
  await fillEmail(page, email);
  await saveDiscovery(page);
  await waitForDiscoveryRecordedNotification(page);
  await verifySecretStatusAPI(request, nickname);
});
