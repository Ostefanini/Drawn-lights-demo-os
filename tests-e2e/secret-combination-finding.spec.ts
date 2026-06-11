import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:3004';
const API_BASE = `${BASE_URL}/apis`;

/**
 * Parse FORCE_SECRET_COMBINATION from the env (loaded from .env.test by playwright.config.ts).
 * Format: "ASSET_ONE,ASSET_TWO,ASSET_THREE,ASSET_FOUR,SOUND" — use NULL for absent assets.
 * Example: TRIANGLE,SQUARE,CIRCLE,NULL,GLOSSY
 */
function parseSecretCombination(raw: string | undefined): { assets: string[]; sound: string } {
  if (!raw) throw new Error('FORCE_SECRET_COMBINATION is not set in .env.test');
  const parts = raw.split(',');
  if (parts.length !== 5) throw new Error(`FORCE_SECRET_COMBINATION must have 5 parts, got: ${raw}`);
  const sound = parts[4].toLowerCase();
  const assets = parts.slice(0, 4)
    .filter((p) => p !== 'NULL')
    .map((p) => p.toLowerCase());
  return { assets, sound };
}

const { assets: SECRET_ASSETS, sound: SECRET_SOUND } = parseSecretCombination(
  process.env.FORCE_SECRET_COMBINATION
);

/**
 * Happy path E2E test.
 *
 * Prerequisites:
 *  - docker compose -f docker-compose.tests.yml --profile e2e up (front on :3004, api on :4004)
 *  - Assets already seeded in the database
 *  - Fresh secret combination (not yet claimed) — restarting the stack resets via tmpfs
 */
test('happy path — finds the secret combination and claims the prize with an email', async ({ page, request }) => {
  // ── 1. Navigate to the app ──────────────────────────────────────────────
  await page.goto(BASE_URL);

  // If the DB is empty, click "Populate" and wait for assets to load
  const populateButton = page.getByRole('button', { name: /populate|remplir/i });
  await expect(populateButton).toBeVisible({ timeout: 10_000 });
  await populateButton.click();
  // Wait for network to stabilize (assets fetched and rendered)
  await page.waitForLoadState('networkidle');

  // Wait for at least one asset card heading to be visible
  await expect(
    page.getByRole('heading', { level: 3, name: new RegExp(SECRET_ASSETS[0], 'i') }).first()
  ).toBeVisible({ timeout: 15_000 });

  // ── 2. Add TRIANGLE → SQUARE → CIRCLE to the playlist ──────────────────
  for (const assetName of SECRET_ASSETS) {
    // Navigate from the heading up to the Card root (2 levels: Title > Group > Card)
    // and click the only button inside it (IconPlaylistAdd)
    await page
      .getByRole('heading', { level: 3, name: new RegExp(assetName, 'i') })
      .locator('xpath=../..')
      .getByRole('button')
      .click();
  }

  // ── 3. Select the "glossy" audio track ─────────────────────────────────
  await page.getByRole('radio', { name: SECRET_SOUND }).click();

  // ── 4. Open the compute menu (floating bottom-right button) ─────────────
  await page.getByRole('button', { name: /validate/i }).click();

  // ── 5. Click "Compute" inside the dropdown ──────────────────────────────
  await page.getByRole('button', { name: /compute|calculer/i }).click();

  // ── 6. Assert the secret combination alert is shown ─────────────────────
  await expect(
    page.getByText(/incredible.*secret combination|secret_combination_title/i)
  ).toBeVisible({ timeout: 15_000 });

  // ── 7. Fill in the nickname (new user) ──────────────────────────────────
  const nickname = 'E2ETester';

  const nicknameInput = page.getByPlaceholder(/attribute.*discovery|attribuer/i);
  await nicknameInput.click();
  await nicknameInput.fill(nickname);

  // Select the "Create <nickname>" option in the combobox dropdown
  await page.getByText(new RegExp(`\\+ Create ${nickname}|\\+ Créer ${nickname}`, 'i')).click();

  // ── 8. Fill in the email ─────────────────────────────────────────────────
  const email = 'e2etester@example.com';
  await page.getByPlaceholder('your@email.com').fill(email);

  // ── 9. Save ──────────────────────────────────────────────────────────────
  await page.getByRole('button', { name: /^save$|^enregistrer$/i }).click();

  // ── 10. Verify the success notification ─────────────────────────────────
  await expect(
    page.getByText(/discovery.*recorded|découverte.*enregistrée/i)
  ).toBeVisible({ timeout: 10_000 });

  // ── 11. Verify via GET /combinations/secret-status that the DB row is updated ──
  // The endpoint returns found:true + the nickname (no email exposed).
  const statusResponse = await request.get(`${API_BASE}/combinations/secret-status`);
  expect(statusResponse.ok()).toBeTruthy();

  const statusBody = await statusResponse.json() as { found: boolean; foundByNickname: string | null };
  expect(statusBody.found).toBe(true);
  expect(statusBody.foundByNickname).toBe(nickname);
});
