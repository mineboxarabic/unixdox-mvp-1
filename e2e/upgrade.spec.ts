import { test, expect } from './fixtures/auth';

test.describe('Upgrade Flow', () => {
  test('Upgrade page: displays both pricing plans', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/upgrade');
    await page.waitForTimeout(1000);

    // Should display the upgrade heading
    await expect(page.getByText('Passer à Unidox Premium', { exact: true })).toBeVisible();

    // Both plans should be visible
    await expect(page.getByText('Standard', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('3.99€/mois').first()).toBeVisible();
    await expect(page.getByText('Premium', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('6.99€/mois').first()).toBeVisible();

    // Engagement toggle should be visible
    await expect(page.getByText('Engagement 1 an')).toBeVisible();
    await expect(page.getByText('Sans engagement')).toBeVisible();
  });

  test('Upgrade page: select plan, pay, and redirect to home', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/upgrade');
    await page.waitForTimeout(1000);

    // Select Premium plan — clicking the card shows the payment form
    await page.getByText('Premium', { exact: true }).first().click();

    // Payment form should now be visible
    await expect(page.getByTestId('card-number')).toBeVisible({ timeout: 3000 });

    // Fill in card details with arbitrary values
    await page.getByTestId('card-number').fill('4242424242424242');
    await page.getByTestId('card-expiry').fill('12/30');
    await page.getByTestId('card-cvv').fill('123');
    await page.getByTestId('card-holder').fill('Test User');

    // Submit the payment
    await page.getByTestId('payment-submit').click();

    // Should show processing state
    await expect(page.getByTestId('payment-processing')).toBeVisible();

    // Should show success state after processing
    await expect(page.getByTestId('payment-success')).toBeVisible({ timeout: 5000 });

    // Should redirect to home page after success
    await page.waitForURL('/', { timeout: 5000 });
    expect(page.url()).toContain('/');
  });
});
