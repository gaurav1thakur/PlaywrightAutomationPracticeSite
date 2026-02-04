import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InputsFormPage extends BasePage {

  // Input field locators
  readonly numberInput: Locator = this.page.getByRole('spinbutton', { name: 'Input: Number' });
  readonly textInput: Locator = this.page.getByRole('textbox', { name: 'Input: Text' });
  readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Input: Password' });
  readonly dateInput: Locator = this.page.getByRole('textbox', { name: 'Input: Date' });

  // Button locators
  readonly displayInputsBtn: Locator = this.page.getByRole('button', { name: 'Display Inputs' });
  readonly clearInputsBtn: Locator = this.page.getByRole('button', { name: 'Clear Inputs' });

  // Output value locators (using test id or accessible locators)
  readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Web inputs page for Automation Testing Practice' });

  readonly URL = 'https://practice.expandtesting.com/inputs';

  constructor(page: Page) {
    super(page);
  }

  // ==================== NAVIGATION ====================

  async navigateToInputsForm(): Promise<void> {
    // Prevent unexpected external navigations by aborting requests to other domains
    await this.page.route('**/*', (route) => {
      const request = route.request();
      const url = request.url();
      // Only block top-level navigations to external domains. Allow resource requests.
      if (request.isNavigationRequest()) {
        if (url.includes('practice.expandtesting.com') || url.includes('localhost') || url.includes('127.0.0.1')) {
          route.continue();
        } else {
          route.abort();
        }
      } else {
        route.continue();
      }
    });

    await this.navigateTo(this.URL);
    // Prevent the page's form from submitting/navigation during tests
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.evaluate(() => {
      const forms = Array.from(document.querySelectorAll('form'));
      forms.forEach(f => f.addEventListener('submit', e => e.preventDefault()));
    });
  }


  // ==================== PAGE ASSERTIONS ====================

  async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('Web inputs page for Automation Testing Practice');
    await expect(this.pageHeading).toBeVisible();
  }

  async assertAllInputsVisible(): Promise<void> {
    await expect(this.numberInput).toBeVisible();
    await expect(this.textInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.dateInput).toBeVisible();
  }

  async assertAllButtonsVisible(): Promise<void> {
    await expect(this.displayInputsBtn).toBeVisible();
    await expect(this.clearInputsBtn).toBeVisible();
  }

  async assertAllButtonsEnabled(): Promise<void> {
    await expect(this.displayInputsBtn).toBeEnabled();
    await expect(this.clearInputsBtn).toBeEnabled();
  }

  // ==================== INPUT FIELD INTERACTIONS ====================

  async fillNumberInput(value: string): Promise<void> {
    await this.numberInput.fill(value);
  }

  async fillTextInput(value: string): Promise<void> {
    await this.textInput.fill(value);
  }

  async fillPasswordInput(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async fillDateInput(value: string): Promise<void> {
    try {
      await this.dateInput.fill(value);
    } catch (err) {
      // Playwright may throw for malformed date values (HTML date input)
      // Swallow the error so tests can verify that invalid dates are rejected
    }
  }

  async fillAllInputs(number: string, text: string, password: string, date: string): Promise<void> {
    await this.fillNumberInput(number);
    await this.fillTextInput(text);
    await this.fillPasswordInput(password);
    await this.fillDateInput(date);
  }

  // ==================== GET INPUT VALUES ====================

  async getNumberInputValue(): Promise<string | null> {
    return await this.numberInput.inputValue();
  }

  async getTextInputValue(): Promise<string | null> {
    return await this.textInput.inputValue();
  }

  async getPasswordInputValue(): Promise<string | null> {
    return await this.passwordInput.inputValue();
  }

  async getDateInputValue(): Promise<string | null> {
    return await this.dateInput.inputValue();
  }

  // ==================== BUTTON INTERACTIONS ====================

  async clickDisplayInputs(): Promise<void> {
    await this.displayInputsBtn.click();
  }

  async clickClearInputs(): Promise<void> {
    await this.clearInputsBtn.click();
  }

  // ==================== OUTPUT VERIFICATIONS ====================

  private getOutputLocators(): { number: Locator; text: Locator; password: Locator; date: Locator } {
    // Get all strong tags which contain output values
    const outputLabels = this.page.locator('strong');
    return {
      number: outputLabels.nth(0),
      text: outputLabels.nth(1),
      password: outputLabels.nth(2),
      date: outputLabels.nth(3),
    };
  }

  async getOutputValues(): Promise<{ number: string; text: string; password: string; date: string }> {
    const outputs = this.getOutputLocators();
    return {
      number: await outputs.number.textContent() || '',
      text: await outputs.text.textContent() || '',
      password: await outputs.password.textContent() || '',
      date: await outputs.date.textContent() || '',
    };
  }

  async assertNumberOutput(expectedValue: string): Promise<void> {
    const outputs = this.getOutputLocators();
    await expect(outputs.number).toHaveText(expectedValue);
  }

  async assertTextOutput(expectedValue: string): Promise<void> {
    const outputs = this.getOutputLocators();
    await expect(outputs.text).toHaveText(expectedValue);
  }

  async assertPasswordOutput(expectedValue: string): Promise<void> {
    const outputs = this.getOutputLocators();
    await expect(outputs.password).toHaveText(expectedValue);
  }

  async assertDateOutput(expectedValue: string): Promise<void> {
    const outputs = this.getOutputLocators();
    await expect(outputs.date).toHaveText(expectedValue);
  }

  async assertAllOutputs(number: string, text: string, password: string, date: string): Promise<void> {
    await this.assertNumberOutput(number);
    await this.assertTextOutput(text);
    await this.assertPasswordOutput(password);
    await this.assertDateOutput(date);
  }

  // ==================== FORM STATE MANAGEMENT ====================

  async clearAllInputsManually(): Promise<void> {
    await this.numberInput.fill('');
    await this.textInput.fill('');
    await this.passwordInput.fill('');
    await this.dateInput.fill('');
  }

  async assertAllInputsEmpty(): Promise<void> {
    await expect(this.numberInput).toHaveValue('');
    await expect(this.textInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
    await expect(this.dateInput).toHaveValue('');
  }

  // ==================== KEYBOARD NAVIGATION ====================

  async focusNumberInput(): Promise<void> {
    await this.numberInput.focus();
  }

  async pressTab(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  async tabThroughFields(): Promise<void> {
    await this.focusNumberInput();
    await this.pressTab(); // to text
    await this.pressTab(); // to password
    await this.pressTab(); // to date
    //await this.pressTab(); // to display button
  }
}