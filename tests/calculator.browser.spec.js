import { expect, test } from '@playwright/test'

for (const viewport of [
  { name: 'mobile', width: 320, height: 568 },
  { name: 'desktop', width: 1280, height: 720 },
]) {
  test(`renders the initial shell without horizontal overflow on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Calculadora de tope de reintegro' })).toBeVisible()
    await expect(page.getByLabel('Porcentaje de descuento')).toHaveAttribute('placeholder', 'Ej: 15')
    await expect(page.getByLabel('Tope de reintegro')).toHaveAttribute('placeholder', 'Ej: 10000')
    await expect(page.locator('#results')).toBeHidden()
    await expect(page.getByText('Monto teórico = Tope / (Porcentaje / 100)')).toBeVisible()
    await expect(page.locator('#disclaimer summary')).toContainText('Resultado orientativo')
    await expect(page.getByText('Con 15% de descuento y un tope de $10.000:')).toBeVisible()
    await expect(page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).resolves.toBe(true)
  })
}

test('keeps the declared keyboard order and visible focus', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  await expect(page.getByLabel('Porcentaje de descuento')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByLabel('Tope de reintegro')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Limpiar' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('#disclaimer summary')).toBeFocused()
})

test('renders both current results for valid inputs', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Porcentaje de descuento').fill('15')
  await page.getByLabel('Tope de reintegro').fill('10000')

  await expect(page.locator('#results')).toBeVisible()
  await expect(page.locator('#theoretical-result')).toHaveText('$66.666,67')
  await expect(page.locator('#safe-result')).toHaveText('$66.666,66')
  await expect(page.locator('#discount-error')).toBeHidden()
  await expect(page.locator('#cap-error')).toBeHidden()
  await expect(page.locator('#calculator-status')).toHaveText('Monto teórico de compra: $66.666,67. Máximo seguro de compra: $66.666,66.')

  await page.getByLabel('Porcentaje de descuento').fill('20')
  await expect(page.locator('#theoretical-result')).toHaveText('$50.000,00')
  await expect(page.locator('#safe-result')).toHaveText('$50.000,00')

  await page.locator('#disclaimer summary').click()
  await expect(page.locator('#disclaimer')).toHaveAttribute('open', '')
  await page.getByLabel('Porcentaje de descuento').fill('-5')
  await expect(page.locator('#results')).toBeHidden()
  await expect(page.locator('#disclaimer')).toHaveAttribute('open', '')
})

test('shows only visible errors and hides stale results', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Porcentaje de descuento').fill('-5')

  await expect(page.locator('#discount-error')).toHaveText('Ingresa un porcentaje válido sin signos ni separadores de miles.')
  await expect(page.locator('#discount-error')).toBeVisible()
  await expect(page.locator('#cap-error')).toBeHidden()
  await expect(page.getByLabel('Porcentaje de descuento')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#results')).toBeHidden()
  await expect(page.locator('#calculator-status')).toHaveText('Ingresa un porcentaje válido sin signos ni separadores de miles.')
})

test('defers incomplete feedback until blur and clears the full state', async ({ page }) => {
  await page.goto('/')

  const discount = page.getByLabel('Porcentaje de descuento')
  const cap = page.getByLabel('Tope de reintegro')
  await discount.fill('15,')

  await expect(page.locator('#discount-error')).toBeHidden()
  await expect(page.locator('#calculator-status')).toBeEmpty()
  await cap.focus()
  await expect(page.locator('#discount-error')).toHaveText('Completa el número con hasta dos decimales.')

  await discount.fill('15')
  await cap.fill('10000')
  await expect(page.locator('#results')).toBeVisible()
  await page.getByRole('button', { name: 'Limpiar' }).click()

  await expect(discount).toHaveValue('')
  await expect(cap).toHaveValue('')
  await expect(page.locator('#discount-error')).toBeHidden()
  await expect(page.locator('#cap-error')).toBeHidden()
  await expect(page.locator('#results')).toBeHidden()
  await expect(page.locator('#calculator-status')).toBeEmpty()
})
