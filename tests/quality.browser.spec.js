import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'mobile-small', width: 320, height: 568 },
  { name: 'mobile', width: 375, height: 667 },
  { name: 'landscape', width: 568, height: 320 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
]

function expectNoHorizontalOverflow(page) {
  return expect(page.evaluate(() => (
    document.documentElement.scrollWidth <= document.documentElement.clientWidth
  ))).resolves.toBe(true)
}

for (const viewport of viewports) {
  test(`keeps every required state operable at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/')
    await expectNoHorizontalOverflow(page)
    await expect(page.getByText('Con 15% de descuento y un tope de $10.000:')).toBeVisible()

    await page.getByLabel('Porcentaje de descuento').fill('15')
    await page.getByLabel('Tope de reintegro').fill('10000')
    await expect(page.locator('#results')).toBeVisible()

    await page.getByLabel('Porcentaje de descuento').fill('-1')
    await expect(page.locator('#discount-error')).toBeVisible()
    await expect(page.locator('#results')).toBeHidden()

    await page.locator('#disclaimer summary').click()
    await expect(page.locator('#disclaimer')).toHaveAttribute('open', '')
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
    await expectNoHorizontalOverflow(page)
  })
}

test('measures synchronous input rendering below the p95 budget', async ({ page }) => {
  await page.goto('/')

  const samples = await page.evaluate(() => {
    const discount = document.querySelector('#discount')
    const cap = document.querySelector('#cap')
    const durations = []

    cap.value = '10000'
    for (const value of ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']) {
      const startedAt = performance.now()
      discount.value = value
      discount.dispatchEvent(new Event('input', { bubbles: true }))
      durations.push(performance.now() - startedAt)
    }

    return durations
  })
  const sorted = [...samples].sort((left, right) => left - right)
  const p95 = sorted[Math.ceil(0.95 * sorted.length) - 1]

  expect(p95).toBeLessThanOrEqual(50)
})

test('keeps values private across input and reload', async ({ page }) => {
  const requests = []
  page.on('request', (request) => requests.push(request))
  await page.goto('/')
  await page.getByLabel('Porcentaje de descuento').fill('17.13')
  await page.getByLabel('Tope de reintegro').fill('12345.67')

  await expect(page.locator('#results')).toBeVisible()
  await expect(page.evaluate(() => ({
    localStorage: localStorage.length,
    sessionStorage: sessionStorage.length,
  }))).resolves.toEqual({ localStorage: 0, sessionStorage: 0 })
  await expect(page.context().cookies()).resolves.toEqual([])
  await expect(page.evaluate(async () => (await indexedDB.databases()).length)).resolves.toBe(0)
  expect(requests.every((request) => (
    !request.url().includes('17.13')
    && !request.url().includes('12345.67')
    && !(request.postData() ?? '').includes('17.13')
    && !(request.postData() ?? '').includes('12345.67')
  ))).toBe(true)

  await page.reload()
  await expect(page.getByLabel('Porcentaje de descuento')).toHaveValue('')
  await expect(page.getByLabel('Tope de reintegro')).toHaveValue('')
  await expect(page.evaluate(() => ({
    localStorage: localStorage.length,
    sessionStorage: sessionStorage.length,
  }))).resolves.toEqual({ localStorage: 0, sessionStorage: 0 })
  await expect(page.evaluate(async () => (await indexedDB.databases()).length)).resolves.toBe(0)
})

test('ships a relative, versioned artifact and works from a static subpath', async ({ page, request }) => {
  await page.goto('/')
  const version = await request.get('/version.json')

  expect(version.ok()).toBe(true)
  expect(await version.json()).toEqual({
    commit: expect.any(String),
    dirty: expect.any(Boolean),
    sourceDigest: expect.stringMatching(/^[a-f0-9]{64}$/),
  })
  await expect(page.evaluate(() => performance.getEntriesByType('resource').every((entry) => (
    new URL(entry.name).origin === location.origin
  )))).resolves.toBe(true)

  await page.goto('http://127.0.0.1:4174/calculadora/')
  await page.getByLabel('Porcentaje de descuento').fill('15')
  await page.getByLabel('Tope de reintegro').fill('10000')
  await expect(page.locator('#safe-result')).toHaveText('$66.666,66')
})
