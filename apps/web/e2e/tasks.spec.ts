import { expect, test } from '@playwright/test';

async function signInDemo(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByRole('button', { name: /try the demo account/i }).click();
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).toHaveURL('/');
}

test.describe('Tasks', () => {
  test.beforeEach(async ({ page }) => {
    await signInDemo(page);
  });

  test('create a task and see it in Today', async ({ page }) => {
    await page.getByRole('button', { name: /^new task$/i }).first().click();
    await expect(page).toHaveURL(/\/task\/new/);

    await page.getByRole('button', { name: /^study/i }).click();
    await page.getByLabel('Title').fill('E2E learn TypeScript');
    await page.getByLabel('Description (optional)').fill('Effective TypeScript book');
    // Date/time inputs default to "now" — keep them.

    await page.getByRole('button', { name: /^create$/i }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByText('E2E learn TypeScript')).toBeVisible();
  });

  test('toggle and edit an existing task', async ({ page }) => {
    // Click on the first task title to enter edit mode (links wrap title in TaskCard).
    const firstTask = page.locator('h3').first();
    const originalTitle = (await firstTask.textContent())?.trim() ?? '';
    await firstTask.click();

    await expect(page).toHaveURL(/\/task\//);
    await page.getByLabel('Title').fill(`${originalTitle} (edited)`);
    await page.getByRole('button', { name: /^save$/i }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByText(`${originalTitle} (edited)`)).toBeVisible();
  });

  test('filter by Late shows overdue tasks', async ({ page }) => {
    await page.getByRole('button', { name: /^late/i }).click();
    await expect(page.locator('text=Late task example')).toBeVisible();
  });

  test('navigates to 404 for unknown route', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByText('404')).toBeVisible();
  });
});
