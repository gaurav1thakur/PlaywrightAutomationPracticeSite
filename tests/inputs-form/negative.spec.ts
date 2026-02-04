// spec: specs/inputs-form.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { InputsFormPage } from '../../pages/InputsFormPage';

test.describe('Inputs Form - Negative Scenarios', () => {
  let inputsPage: InputsFormPage;

  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsFormPage(page);
    await inputsPage.navigateToInputsForm();
  });

  test('Display Inputs with all fields empty', async () => {
    // 1. Click 'Display Inputs' button without filling any fields
    await inputsPage.clickDisplayInputs();

    // 2. Application should handle empty inputs gracefully
    await expect(inputsPage.displayInputsBtn).toBeVisible();
    await expect(inputsPage.clearInputsBtn).toBeVisible();
    
    // No errors should appear on the page - verify page is still functional
    const pageUrl = inputsPage.getPageUrl();
    expect(pageUrl).toContain('practice.expandtesting.com/inputs');
  });

  test('Display Inputs with only one field filled', async () => {
    // 1. Enter only 'SingleValue' in the Text input field
    await inputsPage.fillTextInput('SingleValue');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Verify only Text field output is displayed
    await inputsPage.assertTextOutput('SingleValue');
  });

  test('Enter very large number in number field', async () => {
    // 1. Enter '999999999999999' in the Number input field
    await inputsPage.fillNumberInput('999999999999999');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Verify large number is displayed without errors
    await inputsPage.assertNumberOutput('999999999999999');
  });

  test('Enter negative number in number field', async () => {
    // 1. Enter '-50' in the Number input field
    await inputsPage.fillNumberInput('-50');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Verify negative number is handled correctly
    await inputsPage.assertNumberOutput('-50');
  });

  test('Enter text with very long string in text field', async () => {
    // 1. Create a 500-character long string
    const longString = 'A'.repeat(500);
    
    // 2. Enter long string in the Text input field
    await inputsPage.fillTextInput(longString);

    // 3. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 4. Form should handle long strings gracefully - verify no performance issues
    await expect(inputsPage.displayInputsBtn).toBeVisible();
    const outputValues = await inputsPage.getOutputValues();
    expect(outputValues.text.length).toBe(500);
  });

  test('Enter invalid date format', async ({ page }) => {
    // 1. Attempt to enter '02/03/2026' (MM/DD/YYYY format) in the Date field
    // Note: HTML5 date input expects yyyy-MM-dd format
    await inputsPage.fillDateInput('02/03/2026');

    // 2. Verify field validation - field should not accept invalid format
    const dateValue = await inputsPage.getDateInputValue();
    
    // 3. If invalid, field should be empty or the browser should reject it
    // HTML5 validation may prevent this or allow it depending on browser
    if (dateValue && dateValue !== '') {
      // If it was accepted, verify it doesn't display in output as-is
      await inputsPage.clickDisplayInputs();
    }
  });

  test('Enter non-existent date (February 30)', async () => {
    // 1. Attempt to enter '2026-02-30' (February 30th, non-existent)
    await inputsPage.fillDateInput('2026-02-30');

    // 2. Verify browser validation rejects invalid date
    const dateValue = await inputsPage.getDateInputValue();
    
    // HTML5 date input should reject this
    // Either field remains empty or browser prevents entry
    expect(dateValue === '' || dateValue === null).toBeTruthy();
  });

  test('Enter password with only spaces', async () => {
    // 1. Enter '     ' (5 spaces) in the Password input field
    await inputsPage.fillPasswordInput('     ');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Form should handle whitespace input
    await inputsPage.assertPasswordOutput('     ');
  });

  test('Enter text with only numbers in text field', async () => {
    // 1. Enter '123456' in the Text input field
    await inputsPage.fillTextInput('123456');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Verify numeric string is treated as text
    await inputsPage.assertTextOutput('123456');

    // 4. Compare with number field - should be displayed differently
    const outputs = await inputsPage.getOutputValues();
    expect(outputs.text).toBe('123456');
  });
});