import { test, expect } from '@playwright/test';

test.describe('Example Test Suite', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
  });

  test('should have a specific element', async ({ page }) => {
    await page.goto('https://example.com');
    const element = await page.locator('h1');
    await expect(element).toBeVisible();
  });
});