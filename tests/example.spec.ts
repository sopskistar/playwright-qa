import { test, expect } from '@playwright/test';

test('User can login and add product to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
test('Locked out user cannot log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('locked_out_user');

  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out.');
});
test('User can sort products from low to high price', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(price =>
    parseFloat(price.replace('$', ''))
  );

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});
test('Added product appears correctly in cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

 await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart.html/);

 await expect(
  page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' })
).toHaveText('Sauce Labs Backpack');
});