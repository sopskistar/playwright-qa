import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers';

test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
});

test('User can sort products from low to high price', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]')
    .selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(price =>
    parseFloat(price.replace('$', ''))
  );

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});

test('User can add a product to the cart', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/cart.html/);

  await expect(
    page.locator('[data-test="inventory-item-name"]')
      .filter({ hasText: 'Sauce Labs Backpack' })
  ).toHaveText('Sauce Labs Backpack');

  await expect(
    page.locator('[data-test="item-quantity"]')
  ).toHaveText('1');
});