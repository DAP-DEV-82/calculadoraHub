import { describe, expect, it } from 'vitest'

describe('calculator core boundary', () => {
  it('remains available for DOM-free logic in Story 1.2', async () => {
    const calculatorModule = await import('../src/calculator.js')

    expect(Object.keys(calculatorModule)).toEqual([])
  })
})
