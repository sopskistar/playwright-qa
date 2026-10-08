import { test, expect } from '@playwright/test';

test('User can add a product to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);

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