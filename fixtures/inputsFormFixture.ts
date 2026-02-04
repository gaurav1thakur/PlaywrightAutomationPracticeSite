import { test as base } from '@playwright/test';
import { InputsFormPage } from '../pages/InputsFormPage';

type InputsFormFixtures = {
  inputsPage: InputsFormPage;
};

export const test = base.extend<InputsFormFixtures>({
  inputsPage: async ({ page }, use) => {
    const inputsPage = new InputsFormPage(page);
    await inputsPage.navigateToInputsForm();
    await use(inputsPage);
  },
});

export { expect } from '@playwright/test';