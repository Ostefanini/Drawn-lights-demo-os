import type { APIRequestContext, Page } from '@playwright/test';
import assert from 'node:assert';

export const BASE_URL = 'http://localhost:3004';
export const API_BASE = `${BASE_URL}/apis`;

/**
 * Parse FORCE_SECRET_COMBINATION from the env (loaded from .env.test by playwright.config.ts).
 * Format: "ASSET_ONE,ASSET_TWO,ASSET_THREE,ASSET_FOUR,SOUND" — use NULL for absent assets.
 * Example: TRIANGLE,SQUARE,CIRCLE,NULL,GLOSSY
 */
export function parseSecretCombination(raw: string | undefined): { assets: string[]; sound: string } {
  if (!raw) throw new Error('FORCE_SECRET_COMBINATION is not set in .env.test');
  const parts = raw.split(',');
  if (parts.length !== 5) throw new Error(`FORCE_SECRET_COMBINATION must have 5 parts, got: ${raw}`);
  const sound = parts[4].toLowerCase();
  const assets = parts
    .slice(0, 4)
    .filter((p) => p !== 'NULL')
    .map((p) => p.toLowerCase());
  return { assets, sound };
}

/** Navigate to the application home page. */
export async function navigateToApp(page: Page): Promise<void> {
  await page.goto(BASE_URL);
}

/**
 * Click the "Populate" button and wait for the first asset card to appear.
 * Handles the initial empty-DB state.
 */
export async function populateAndWaitForAssets(page: Page, firstAsset: string): Promise<void> {
  const populateButton = page.getByRole('button', { name: /populate|remplir/i });
  await populateButton.waitFor({ state: 'visible', timeout: 10_000 });
  await populateButton.click();
  await page.waitForLoadState('networkidle');
  await page
    .getByRole('heading', { level: 3, name: new RegExp(firstAsset, 'i') })
    .first()
    .waitFor({ state: 'visible', timeout: 15_000 });
}

/** Add each asset in the list to the playlist by clicking its card button. */
export async function addAssetsToPlaylist(page: Page, assets: string[]): Promise<void> {
  for (const assetName of assets) {
    // Navigate from the heading up to the Card root (2 levels: Title > Group > Card)
    // and click the only button inside it (IconPlaylistAdd)
    await page
      .getByRole('heading', { level: 3, name: new RegExp(assetName, 'i') })
      .locator('xpath=../..')
      .getByRole('button')
      .click();
  }
}

/** Select the given audio track radio button. */
export async function selectSound(page: Page, sound: string): Promise<void> {
  await page.getByRole('radio', { name: sound }).click();
}

/** Open the validate/compute dropdown menu. */
export async function openValidateMenu(page: Page): Promise<void> {
  await page.getByRole('button', { name: /validate/i }).click();
}

/** Click the "Compute" option inside the dropdown. */
export async function clickCompute(page: Page): Promise<void> {
  await page.getByRole('button', { name: /compute|calculer/i }).click();
}

/** Wait for the "secret combination found" alert to appear. */
export async function waitForSecretCombinationAlert(page: Page): Promise<void> {
  await page
    .getByText(/incredible.*secret combination|secret_combination_title/i)
    .waitFor({ state: 'visible', timeout: 15_000 });
}

/** Fill in the nickname field and select the "Create <nickname>" option in the combobox. */
export async function fillNickname(page: Page, nickname: string): Promise<void> {
  const nicknameInput = page.getByPlaceholder(/attribute.*discovery|attribuer/i);
  await nicknameInput.click();
  await nicknameInput.fill(nickname);
  await page.getByText(new RegExp(`\\+ Create ${nickname}|\\+ Créer ${nickname}`, 'i')).click();
}

/** Fill in the email field. */
export async function fillEmail(page: Page, email: string): Promise<void> {
  await page.getByPlaceholder('your@email.com').fill(email);
}

/** Click the Save / Enregistrer button. */
export async function saveDiscovery(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^save$|^enregistrer$/i }).click();
}

/** Wait for the success notification confirming the discovery was recorded. */
export async function waitForDiscoveryRecordedNotification(page: Page): Promise<void> {
  await page
    .getByText(/discovery.*recorded|découverte.*enregistrée/i)
    .waitFor({ state: 'visible', timeout: 10_000 });
}

/**
 * Verify via GET /combinations/secret-status that the DB row is updated.
 * The endpoint returns found:true + the nickname (no email exposed).
 */
export async function verifySecretStatusAPI(
  request: APIRequestContext,
  expectedNickname: string,
): Promise<void> {
  const response = await request.get(`${API_BASE}/combinations/secret-status`);
  assert.ok(response.ok(), `Secret status API returned HTTP ${response.status()}`);
  const body = (await response.json()) as { found: boolean; foundByNickname: string | null };
  assert.strictEqual(body.found, true, 'Secret combination should be marked as found');
  assert.strictEqual(
    body.foundByNickname,
    expectedNickname,
    `Expected foundByNickname to be "${expectedNickname}"`,
  );
}
