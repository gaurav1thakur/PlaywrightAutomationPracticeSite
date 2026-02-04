// spec: specs/inputs-form.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { InputsFormPage } from '../../pages/InputsFormPage';

test.describe('Inputs Form - Positive Scenarios', () => {
  let inputsPage: InputsFormPage;

  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsFormPage(page);
    await inputsPage.navigateToInputsForm();
  });

  test('Verify page loads successfully with all input fields visible', async () => {
    // 1. Navigate to https://practice.expandtesting.com/inputs
    // Verify page loaded
    await inputsPage.assertPageLoaded();
    await inputsPage.assertAllInputsVisible();
    await inputsPage.assertAllButtonsVisible();
    await inputsPage.assertAllButtonsEnabled();
  });

  test('Enter valid data in all input fields and display results', async () => {
    // 1. Fill all input fields with valid data
    await inputsPage.fillNumberInput('42');
    await inputsPage.fillTextInput('John Doe');
    await inputsPage.fillPasswordInput('TestPassword123!');
    await inputsPage.fillDateInput('2026-02-03');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert output matches input
    await inputsPage.assertAllOutputs('42', 'John Doe', 'TestPassword123!', '2026-02-03');
  });

  test('Enter numeric value with decimal places', async () => {
    // 1. Enter '99.99' in the Number input field
    await inputsPage.fillNumberInput('99.99');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert decimal precision is preserved
    await inputsPage.assertNumberOutput('99.99');
  });

  test('Enter text with special characters', async () => {
    // 1. Enter 'Test@123#Special$%' in the Text input field
    await inputsPage.fillTextInput('Test@123#Special$%');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert special characters are preserved
    await inputsPage.assertTextOutput('Test@123#Special$%');
  });

  test('Enter password with mixed case and special characters', async () => {
    // 1. Enter 'MySecure@Pass2026!' in the Password input field
    await inputsPage.fillPasswordInput('MySecure@Pass2026!');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert password is transmitted correctly
    await inputsPage.assertPasswordOutput('MySecure@Pass2026!');
  });

  test('Enter date at the beginning of year', async () => {
    // 1. Enter '2026-01-01' in the Date input field
    await inputsPage.fillDateInput('2026-01-01');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert first day of year is accepted and displayed
    await inputsPage.assertDateOutput('2026-01-01');
  });

  test('Enter date at the end of year', async () => {
    // 1. Enter '2025-12-31' in the Date input field
    await inputsPage.fillDateInput('2025-12-31');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert last day of year is handled correctly
    await inputsPage.assertDateOutput('2025-12-31');
  });

  test('Clear all input fields and verify they are empty', async () => {
    // 1. Fill all fields with valid data
    await inputsPage.fillAllInputs('100', 'TestValue', 'Password123', '2026-01-15');

    // 2. Click 'Clear Inputs' button
    await inputsPage.clickClearInputs();

    // 3. Assert all input fields are empty
    await inputsPage.assertAllInputsEmpty();

    // 4. Click 'Display Inputs' to verify output is also empty
    await inputsPage.clickDisplayInputs();
  });

  test('Clear button should reset form state', async () => {
    // 1. Fill form with data
    await inputsPage.fillTextInput('TestValue123');
    await inputsPage.fillNumberInput('999');

    // 2. Click 'Clear Inputs' button
    await inputsPage.clickClearInputs();

    // 3. Assert all fields return to empty state
    await inputsPage.assertAllInputsEmpty();

    // 4. Verify form is ready for new input
    await expect(inputsPage.textInput).not.toBeFocused(); // Fields should not be auto-focused after clear
  });
});