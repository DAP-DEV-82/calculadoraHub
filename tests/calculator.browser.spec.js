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
