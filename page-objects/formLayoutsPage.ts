import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutsPage extends HelperBase {
    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()
    }
    /**
     * This method submits the inline form with the given name, email, and remember me checkbox.
     * @param name - The name to fill in the inline form
     * @param email - The email to fill in the inline form
     * @param rememberMe - Whether to check the remember me checkbox
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true })
        }
        await inlineForm.getByRole('button').click()
    }
}