import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locator syntax rules', async ({ page }) => {
    // by tag name
    page.locator('input')

    // by id
    await page.locator('#inputEmail1').click()

    // by class value
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    // by Class value full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"][nbinput].shape-rectangle')

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('user facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'SIGN IN' }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignInButton').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click() // avoid using indexes with nth()
})

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid'}).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: 'Sign in' }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click()
})

test('reusing locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' })
    const passwordInput = basicForm.getByRole('textbox', { name: 'Password' })
    const submitButton = basicForm.getByRole('button')

    await emailInput.fill('test@example.com')
    await passwordInput.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await submitButton.click()

    await expect(emailInput).toHaveValue('test@example.com')
    await expect(passwordInput).toHaveValue('Welcome123')
    await expect(basicForm.locator('nb-checkbox')).toBeEnabled()
})

test('exctracting values', async ({ page }) => {
    // single test value
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioLabels).toContain('Option 1')

    // input value
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@example.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@example.com')

    // attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')

    // General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // Locator assertions
    await expect(basicFormButton).toHaveText('Submit')

    // Soft assertions
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})