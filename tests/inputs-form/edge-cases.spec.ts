// spec: specs/inputs-form.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { InputsFormPage } from '../../pages/InputsFormPage';

test.describe('Inputs Form - Edge Cases and Boundary Tests', () => {
  let inputsPage: InputsFormPage;

  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsFormPage(page);
    await inputsPage.navigateToInputsForm();
  });

  test('Enter zero in number field', async () => {
    // 1. Enter '0' in the Number input field
    await inputsPage.fillNumberInput('0');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert zero is treated as valid input
    await inputsPage.assertNumberOutput('0');
  });

  test('Enter text with line breaks (if possible)', async () => {
    // 1. Attempt to enter text with newline character
    await inputsPage.textInput.fill('Line1\nLine2');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Verify form handles line breaks according to implementation
    const outputValues = await inputsPage.getOutputValues();
    expect(outputValues.text).toBeTruthy();
  });

  test('Tab navigation between input fields', async () => {
    // 1. Click on Number field to focus it
    await inputsPage.focusNumberInput();
    
    // 2. Verify Number field is focused
    await expect(inputsPage.numberInput).toBeFocused();

    // 3. Press Tab to navigate to Text field
    await inputsPage.pressTab();
    await expect(inputsPage.textInput).toBeFocused();

    // 4. Press Tab to navigate to Password field
    await inputsPage.pressTab();
    await expect(inputsPage.passwordInput).toBeFocused();

    // 5. Press Tab to navigate to Date field
    await inputsPage.pressTab();
    await expect(inputsPage.dateInput).toBeFocused();

    // // 6. Press Tab again - should move to Display Inputs button
    // await inputsPage.pressTab();
    // await expect(inputsPage.displayInputsBtn).toBeFocused();
  });

  test('Multiple consecutive Clear button clicks', async () => {
    // 1. Fill all fields with data
    await inputsPage.fillAllInputs('50', 'TestData', 'Password', '2026-02-03');

    // 2. Click 'Clear Inputs' button first time
    await inputsPage.clickClearInputs();
    await inputsPage.assertAllInputsEmpty();

    // 3. Click 'Clear Inputs' button again immediately
    await inputsPage.clickClearInputs();
    
    // 4. Fields should remain empty
    await inputsPage.assertAllInputsEmpty();

    // 5. Click 'Clear Inputs' button a third time
    await inputsPage.clickClearInputs();
    
    // 6. Form should remain stable in cleared state
    await inputsPage.assertAllInputsEmpty();
    await expect(inputsPage.displayInputsBtn).toBeEnabled();
  });

  test('Multiple consecutive Display Inputs clicks with same data', async () => {
    // 1. Fill all fields with valid data
    await inputsPage.fillAllInputs('42', 'TestValue', 'Pass123', '2026-02-03');

    // 2. Click 'Display Inputs' button first time
    await inputsPage.clickDisplayInputs();
    let firstOutputs = await inputsPage.getOutputValues();

    // 3. Click 'Display Inputs' button again without changing input
    await inputsPage.clickDisplayInputs();
    let secondOutputs = await inputsPage.getOutputValues();

    // 4. Outputs should remain the same
    expect(firstOutputs).toEqual(secondOutputs);

    // 5. Click 'Display Inputs' button a third time
    await inputsPage.clickDisplayInputs();
    let thirdOutputs = await inputsPage.getOutputValues();

    // 6. Output should be consistent
    expect(secondOutputs).toEqual(thirdOutputs);
  });

  test('Modify input after Display Inputs was clicked', async () => {
    // 1. Fill all fields with initial values
    await inputsPage.fillTextInput('John');
    await inputsPage.fillNumberInput('100');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();
    let initialOutputs = await inputsPage.getOutputValues();
    expect(initialOutputs.text).toBe('John');

    // 3. Modify the Text field value from 'John' to 'Jane'
    await inputsPage.fillTextInput('Jane');

    // 4. Click 'Display Inputs' button again
    await inputsPage.clickDisplayInputs();
    let updatedOutputs = await inputsPage.getOutputValues();

    // 5. Output should reflect the latest input values
    expect(updatedOutputs.text).toBe('Jane');
    expect(updatedOutputs.number).toBe('100'); // Number should remain unchanged
  });

  test('Date field with leap year date', async () => {
    // 1. Enter '2024-02-29' (leap year date) in the Date field
    await inputsPage.fillDateInput('2024-02-29');

    // 2. Click 'Display Inputs' button
    await inputsPage.clickDisplayInputs();

    // 3. Assert leap year date is handled correctly
    await inputsPage.assertDateOutput('2024-02-29');
  });

  test('Date field with non-leap year February 29', async () => {
    // 1. Attempt to enter '2025-02-29' (non-leap year, invalid date)
    await inputsPage.fillDateInput('2025-02-29');

    // 2. HTML5 date validation should reject this
    const dateValue = await inputsPage.getDateInputValue();
    
    // 3. Verify field is empty (browser rejected invalid date)
    expect(dateValue === '' || dateValue === null).toBeTruthy();
  });
});