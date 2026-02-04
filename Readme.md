Playwright MCP

1. playwright-test-planner
2. playwright-test-generator
3. playwright-test-healer

PlaywrightAutomationPracticeSite/
├── pages/
│   ├── BasePage.ts
│   └── InputsFormPage.ts
├── tests/
│   ├── inputs-form/
│   │   ├── positive.spec.ts
│   │   ├── negative.spec.ts
│   │   └── edge-cases.spec.ts
│   ├── seed.spec.ts
│   └── example.spec.js
├── fixtures/
│   └── inputsFormFixture.ts
├── specs/
│   └── inputs-form.plan.md
├── playwright.config.js
└── package.json

Allure Reporting
 
1. Install the Allure Playwright adapter and make sure that the Playwright framework itself is also listed in the project's dependencies.

```
npm install --save-dev @playwright/test allure-playwright
npm install -g allure-commandline   
allure --version     
```

2. In the playwright.config.ts file, add Allure Playwright as a reporter.

```
export default defineConfig({
  // ...
  reporter: [["line"], ["allure-playwright"]],
});
```
3. Run your Playwright tests the same way as you would run them usually.

```
npx playwright test
```

4. Allure to convert the test results into an HTML report.


```
allure serve allure-results
```