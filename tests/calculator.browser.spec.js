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

for (const viewport of [
  { name: 'mobile', width: 320, height: 568 },
  { name: 'desktop', width: 1280, height: 720 },
]) {
  test(`presents safe results and reference content without overflow on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/')
    await page.getByLabel('Porcentaje de descuento').fill('0,01')
    await page.getByLabel('Tope de reintegro').fill('999999999,99')

    await expect(page.locator('#results')).toBeVisible()
    await expect(page.locator('.result-card')).toHaveCount(4)
    await expect(page.locator('#safe-result')).toHaveText('$9.999.999.999.900,00')
    await expect(page.getByText('Usá este valor para no superar el tope.')).toBeVisible()
    await expect(page.getByText('El monto teórico puede incluir fracciones de centavo.')).toBeVisible()
    await expect(page.locator('#disclaimer summary')).toContainText('Resultado orientativo')

    const columnCount = await page.locator('#results').evaluate((element) => (
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length
    ))
    expect(columnCount).toBe(viewport.width < 640 ? 1 : 2)

    await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
    await expect(page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).resolves.toBe(true)
  })
}

test('opens the textual disclaimer with the keyboard', async ({ page }) => {
  await page.goto('/')

  const summary = page.locator('#disclaimer summary')
  await summary.focus()
  await page.keyboard.press('Space')

  await expect(page.locator('#disclaimer')).toHaveAttribute('open', '')
  await expect(page.locator('#disclaimer')).toContainText('Las promociones reales pueden aplicar reglas de redondeo')
})
