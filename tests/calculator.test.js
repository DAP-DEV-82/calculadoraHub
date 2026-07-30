import { describe, expect, it } from 'vitest'
import { evaluateCalculation, formatArs } from '../src/calculator.js'

describe('calculator core', () => {
  it('calculates the normative example with exact rounding and truncation', () => {
    const evaluation = evaluateCalculation({ discountRaw: '15', capRaw: '10000' })

    expect(evaluation).toEqual({
      ok: true,
      result: {
        theoreticalCents: 6666667n,
        safeCents: 6666666n,
      },
    })
    expect(formatArs(evaluation.result.theoreticalCents)).toBe('$66.666,67')
    expect(formatArs(evaluation.result.safeCents)).toBe('$66.666,66')
  })

  it('accepts decimal separators and leading zeroes equivalently', () => {
    const comma = evaluateCalculation({ discountRaw: '015,50', capRaw: '001000,50' })
    const point = evaluateCalculation({ discountRaw: '015.50', capRaw: '001000.50' })

    expect(comma).toEqual(point)
    expect(comma).toEqual({
      ok: true,
      result: {
        theoreticalCents: 645484n,
        safeCents: 645483n,
      },
    })
  })

  it('keeps both error keys and applies grammar precedence independently', () => {
    expect(evaluateCalculation({ discountRaw: '', capRaw: '1000,' })).toEqual({
      ok: false,
      errors: { discount: 'required', cap: 'incomplete' },
    })
    expect(evaluateCalculation({ discountRaw: '1,234', capRaw: '1e3' })).toEqual({
      ok: false,
      errors: { discount: 'too-many-decimals', cap: 'invalid-format' },
    })
  })

  it('rejects whitespace, signs, grouping, scientific notation, zero, and out-of-range values', () => {
    const expectedErrors = {
      '1.000': 'too-many-decimals',
      '0': 'out-of-range',
      '100,01': 'out-of-range',
    }

    for (const invalidDiscountRaw of [' 15', '-1', '+1', '1.000', '1e2', '0', '100,01']) {
      expect(evaluateCalculation({ discountRaw: invalidDiscountRaw, capRaw: '1' })).toEqual({
        ok: false,
        errors: {
          discount: expectedErrors[invalidDiscountRaw] ?? 'invalid-format',
          cap: null,
        },
      })
    }

    expect(evaluateCalculation({ discountRaw: '1', capRaw: '0' })).toEqual({
      ok: false,
      errors: { discount: null, cap: 'out-of-range' },
    })
    expect(evaluateCalculation({ discountRaw: '1', capRaw: '1000000000' })).toEqual({
      ok: false,
      errors: { discount: null, cap: 'out-of-range' },
    })
  })

  it('supports range boundaries and cent-based calculations', () => {
    expect(evaluateCalculation({ discountRaw: '0,01', capRaw: '0,01' })).toEqual({
      ok: true,
      result: { theoreticalCents: 10000n, safeCents: 10000n },
    })
    expect(evaluateCalculation({ discountRaw: '100', capRaw: '999999999,99' })).toEqual({
      ok: true,
      result: { theoreticalCents: 99999999999n, safeCents: 99999999999n },
    })
  })

  it('formats cents with Argentine separators and fixed decimals', () => {
    expect(formatArs(0n)).toBe('$0,00')
    expect(formatArs(123456789n)).toBe('$1.234.567,89')
  })
})
