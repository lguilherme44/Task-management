import { expect, test } from '@playwright/test';

test.describe('Auth', () => {
  test('register → home → logout → login', async ({ page }) => {
    const email = `pw-${Date.now()}@taskflow.test`;

    await page.goto('/register');
    await page.getByPlaceholder('Ada Lovelace').fill('Playwright User');
    await page.getByPlaceholder('you@example.com').fill(email);
    await page.getByPlaceholder('At least 6 characters').fill('secret123');
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Playwright/);

    await page.getByRole('button', { name: /log out/i }).click();
    await expect(page).toHaveURL(/login/);

    // Sign back in with the new credentials.
    await page.getByPlaceholder('you@example.com').fill(email);
    await page.getByPlaceholder('••••••••').fill('secret123');
    await page.getByRole('button', { name: /^sign in$/i }).click();

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Playwright/);
  });

  test('demo account button signs in', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /try the demo account/i }).click();
    await page.getByRole('button', { name: /^sign in$/i }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Demo/);
  });

  test('rejects bad credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('nobody@nowhere.test');
    await page.getByPlaceholder('••••••••').fill('totally-wrong');
    await page.getByRole('button', { name: /^sign in$/i }).click();

    await expect(page).toHaveURL(/login/);
  });
});
