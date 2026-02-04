# Inputs Form Testing - Playwright Test Plan

## Application Overview

The Inputs Form page (https://practice.expandtesting.com/inputs) is a web form designed for automation testing practice. It provides four input fields (Number, Text, Password, Date) and two action buttons (Display Inputs, Clear Inputs). Users can enter data in these fields, click Display Inputs to view the submitted data, and Clear Inputs to reset the form. This test plan covers positive scenarios (valid inputs), negative scenarios (empty/invalid inputs), and edge cases with comprehensive step-by-step instructions and assertions using Web-First Playwright assertions and resilient locators following the Page Object Model pattern.

## Test Scenarios

### 1. Inputs Form - Positive Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify page loads successfully with all input fields visible

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: The page title should be 'Web inputs page for Automation Testing Practice'
    - expect: The main heading 'Web inputs page for Automation Testing Practice' should be visible
    - expect: Number input field with label 'Input: Number' should be visible
    - expect: Text input field with label 'Input: Text' should be visible
    - expect: Password input field with label 'Input: Password' should be visible
    - expect: Date input field with label 'Input: Date' should be visible
    - expect: Display Inputs button should be visible and enabled
    - expect: Clear Inputs button should be visible and enabled

#### 1.2. Enter valid data in all input fields and display results

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: All input fields should be visible and empty
  2. Enter '42' in the Number input field using spinbutton with role locator
    - expect: Number field should contain the value '42'
    - expect: Focus should move to next field
  3. Enter 'John Doe' in the Text input field using textbox with role locator
    - expect: Text field should display 'John Doe'
    - expect: Text should be visible in the input field
  4. Enter 'TestPassword123!' in the Password input field
    - expect: Password field should be filled (value not visible due to password masking)
    - expect: Field should contain the entered text
  5. Enter '2026-02-03' in the Date input field in yyyy-MM-dd format
    - expect: Date field should contain the value '2026-02-03'
    - expect: Date should be properly formatted
  6. Click 'Display Inputs' button
    - expect: Output: Number section should display '42'
    - expect: Output: Text section should display 'John Doe'
    - expect: Output: Password section should display 'TestPassword123!'
    - expect: Output: Date section should display '2026-02-03'
    - expect: All output values should match the input values exactly

#### 1.3. Enter numeric value with decimal places

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Page should load successfully
  2. Enter '99.99' in the Number input field
    - expect: Number field should accept decimal input
    - expect: Field should display the decimal value
  3. Click 'Display Inputs' button
    - expect: Output should display the decimal value '99.99'
    - expect: Decimal precision should be preserved

#### 1.4. Enter text with special characters

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: All fields should be empty and ready for input
  2. Enter 'Test@123#Special$%' in the Text input field
    - expect: Text field should accept special characters
    - expect: All special characters should be displayed correctly
  3. Click 'Display Inputs' button
    - expect: Output should display 'Test@123#Special$%' exactly as entered
    - expect: Special characters should not be encoded or escaped

#### 1.5. Enter password with mixed case and special characters

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Password field should be visible and empty
  2. Enter 'MySecure@Pass2026!' in the Password input field
    - expect: Password should be masked (dots or asterisks shown)
    - expect: Field should not display actual password text
  3. Click 'Display Inputs' button
    - expect: Output should display the exact password value 'MySecure@Pass2026!'
    - expect: Password is transmitted correctly despite masking in input field

#### 1.6. Enter date at the beginning of year

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Date field should be visible and empty
  2. Enter '2026-01-01' in the Date input field
    - expect: Date field should accept the date
    - expect: Format should be yyyy-MM-dd
  3. Click 'Display Inputs' button
    - expect: Output should display '2026-01-01'
    - expect: First day of year should be accepted and displayed

#### 1.7. Enter date at the end of year

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Date field should be ready for input
  2. Enter '2025-12-31' in the Date input field
    - expect: Date field should accept year-end date
  3. Click 'Display Inputs' button
    - expect: Output should display '2025-12-31'
    - expect: Last day of year should be handled correctly

#### 1.8. Clear all input fields and verify they are empty

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs and fill all fields with valid data
    - expect: All fields should contain data
  2. Click 'Clear Inputs' button
    - expect: Number field should be empty
    - expect: Text field should be empty
    - expect: Password field should be empty
    - expect: Date field should be empty
    - expect: All input fields should have no value
  3. Click 'Display Inputs' button after clearing
    - expect: Output: Number should display nothing or empty value
    - expect: Output: Text should display nothing or empty value
    - expect: Output: Password should display nothing or empty value
    - expect: Output: Date should display nothing or empty value

#### 1.9. Clear button should reset form state

**File:** `tests/inputs-form/positive.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Form should load in clean state
  2. Enter 'TestValue123' in Text field and '999' in Number field
    - expect: Fields should contain the entered values
  3. Click 'Clear Inputs' button to reset the form
    - expect: All fields should return to empty state
    - expect: Form should be ready for new input

### 2. Inputs Form - Negative Scenarios

**Seed:** `tests/seed.spec.ts`

#### 2.1. Display Inputs with all fields empty

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs without entering any data
    - expect: All input fields should be empty
  2. Click 'Display Inputs' button without filling any fields
    - expect: Page should handle empty inputs gracefully
    - expect: Output sections should display empty or default values
    - expect: No errors should appear on the page
    - expect: Application should not crash or show error messages

#### 2.2. Display Inputs with only one field filled

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: All fields should be empty
  2. Enter 'SingleValue' in the Text input field
    - expect: Only Text field should contain data
    - expect: Other fields should remain empty
  3. Click 'Display Inputs' button
    - expect: Output: Text should display 'SingleValue'
    - expect: Output: Number should display empty or default value
    - expect: Output: Password should display empty or default value
    - expect: Output: Date should display empty or default value
    - expect: Form should handle partial input correctly

#### 2.3. Enter very large number in number field

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Number field should be ready for input
  2. Enter '999999999999999' in the Number input field
    - expect: Field should accept large number or show validation error
    - expect: Application should handle large values appropriately
  3. Click 'Display Inputs' button
    - expect: Large number should be displayed or validation message shown
    - expect: No application crash or unexpected behavior

#### 2.4. Enter negative number in number field

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Number field should be visible
  2. Enter '-50' in the Number input field
    - expect: Field should accept negative number or show validation
  3. Click 'Display Inputs' button
    - expect: Output should show how negative numbers are handled
    - expect: Either display '-50' or show validation behavior

#### 2.5. Enter text with very long string in text field

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Text field should be ready for input
  2. Enter a 500-character long string in the Text input field
    - expect: Text field should accept the long string or enforce maximum length
    - expect: No application performance issues
  3. Click 'Display Inputs' button
    - expect: Output should display the full text or truncated version
    - expect: Form should handle long strings gracefully

#### 2.6. Enter invalid date format

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Date field should be visible and empty
  2. Attempt to enter '02/03/2026' (MM/DD/YYYY) in the Date field (expects yyyy-MM-dd)
    - expect: Field should not accept invalid format
    - expect: Browser date picker validation should prevent entry
    - expect: Error message or validation should appear or field should remain empty
  3. Click 'Display Inputs' button
    - expect: Invalid date should not be displayed in output
    - expect: Date output should be empty if invalid date was rejected

#### 2.7. Enter non-existent date (February 30)

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Date field should be ready for input
  2. Attempt to enter '2026-02-30' (February 30th, which doesn't exist)
    - expect: Browser validation should reject invalid date
    - expect: Field should not accept non-existent date
  3. Click 'Display Inputs' button
    - expect: Invalid date should not appear in output
    - expect: Date output should be empty

#### 2.8. Enter password with only spaces

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Password field should be empty
  2. Enter '     ' (5 spaces) in the Password input field
    - expect: Field should accept space characters
    - expect: Password masking should display spaces as masked characters
  3. Click 'Display Inputs' button
    - expect: Output should display the spaces or trim them based on implementation
    - expect: Form should handle whitespace input

#### 2.9. Enter text with only numbers in text field

**File:** `tests/inputs-form/negative.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Text field should accept any input
  2. Enter '123456' in the Text input field
    - expect: Text field should accept numeric string
    - expect: Numbers should be treated as text, not parsed as numbers
  3. Click 'Display Inputs' button
    - expect: Output should display '123456' as text
    - expect: Should be different from Number field output if '123456' was also entered there

### 3. Inputs Form - Edge Cases and Boundary Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Enter zero in number field

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Number field should be visible
  2. Enter '0' in the Number input field
    - expect: Field should accept zero value
  3. Click 'Display Inputs' button
    - expect: Output should display '0'
    - expect: Zero should be treated as valid input

#### 3.2. Enter text with line breaks (if possible)

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Text field should be visible and ready for input
  2. Attempt to enter text with newline character in Text field
    - expect: Field should handle line breaks according to implementation
    - expect: Single-line or multi-line input behavior should be consistent
  3. Click 'Display Inputs' button
    - expect: Output should display the text with line breaks preserved or removed

#### 3.3. Tab navigation between input fields

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: All fields should be visible and empty
  2. Click on Number field and press Tab to navigate to Text field
    - expect: Focus should move from Number to Text field
    - expect: Tab navigation should work correctly
  3. Press Tab again to navigate to Password field
    - expect: Focus should move from Text to Password field
    - expect: Navigation order should be logical
  4. Press Tab again to navigate to Date field
    - expect: Focus should move to Date field
    - expect: All fields should be reachable via Tab navigation
  5. Press Tab again to reach Display Inputs button
    - expect: Focus should move to Display Inputs button or beyond form
    - expect: Full keyboard accessibility should be supported

#### 3.4. Multiple consecutive Clear button clicks

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs and fill all fields
    - expect: All fields should contain data
  2. Click 'Clear Inputs' button once
    - expect: All fields should be cleared
  3. Click 'Clear Inputs' button again immediately
    - expect: Button should handle consecutive clicks
    - expect: No errors should occur
    - expect: Fields should remain empty
  4. Click 'Clear Inputs' button a third time
    - expect: Form should remain in cleared state
    - expect: Application should be stable

#### 3.5. Multiple consecutive Display Inputs clicks with same data

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs and fill all fields with valid data
    - expect: All fields should contain values
  2. Click 'Display Inputs' button once
    - expect: Output sections should appear and display correct values
  3. Click 'Display Inputs' button again without changing input
    - expect: Output should remain the same
    - expect: Same values should be displayed again
  4. Click 'Display Inputs' button a third time
    - expect: Output should be consistent
    - expect: Data should not change or duplicate

#### 3.6. Modify input after Display Inputs was clicked

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs and fill all fields
    - expect: All fields should contain data
  2. Click 'Display Inputs' button
    - expect: Output should display the initial values
  3. Modify the Text field value from 'John' to 'Jane'
    - expect: Input field should update with new value
    - expect: Output section should still show old value 'John' until Display Inputs is clicked again
  4. Click 'Display Inputs' button again
    - expect: Output: Text should update to 'Jane'
    - expect: Output should reflect the latest input values

#### 3.7. Date field with leap year date

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Date field should be ready for input
  2. Enter '2024-02-29' (leap year date) in the Date field
    - expect: Field should accept leap year date
    - expect: February 29 should be valid in leap years
  3. Click 'Display Inputs' button
    - expect: Output should display '2024-02-29'
    - expect: Leap year date should be handled correctly

#### 3.8. Date field with non-leap year February 29

**File:** `tests/inputs-form/edge-cases.spec.ts`

**Steps:**
  1. Navigate to https://practice.expandtesting.com/inputs
    - expect: Date field should be visible
  2. Attempt to enter '2025-02-29' (non-leap year) in the Date field
    - expect: Browser validation should reject this date
    - expect: February 29 should not be valid in non-leap years
  3. Click 'Display Inputs' button
    - expect: Invalid date should not appear in output
    - expect: Date output should remain empty
