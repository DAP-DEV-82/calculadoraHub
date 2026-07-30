const CENTS_PER_PESO = 100n
const PERCENT_SCALE_HUNDREDTHS = 10000n
const MAX_DISCOUNT_HUNDREDTHS = 10000n
const MAX_CAP_CENTS = 99999999999n

function classifyInput(raw) {
  if (raw === '') return { error: 'required' }
  if (typeof raw !== 'string') return { error: 'invalid-format' }
  if (/^\d+[.,]$/.test(raw)) return { error: 'incomplete' }
  if (/^\d+[.,]\d{3,}$/.test(raw)) return { error: 'too-many-decimals' }
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(raw)) return { error: 'invalid-format' }

  const [wholeRaw, decimalRaw = ''] = raw.replace(',', '.').split('.')
  const valueUnits = BigInt(wholeRaw) * CENTS_PER_PESO
    + BigInt(`${decimalRaw}00`.slice(0, 2))

  return { valueUnits }
}

function validateInput(raw, maximumUnits) {
  const classified = classifyInput(raw)

  if (classified.error) return classified
  if (classified.valueUnits < 1n || classified.valueUnits > maximumUnits) {
    return { error: 'out-of-range' }
  }

  return classified
}

export function evaluateCalculation({ discountRaw, capRaw }) {
  const discount = validateInput(discountRaw, MAX_DISCOUNT_HUNDREDTHS)
  const cap = validateInput(capRaw, MAX_CAP_CENTS)
  const errors = {
    discount: discount.error ?? null,
    cap: cap.error ?? null,
  }

  if (errors.discount || errors.cap) return { ok: false, errors }

  const discountHundredths = discount.valueUnits
  const capCents = cap.valueUnits
  const numeratorCents = capCents * PERCENT_SCALE_HUNDREDTHS
  const safeCents = numeratorCents / discountHundredths
  const remainderCents = numeratorCents % discountHundredths
  const theoreticalCents = safeCents
    + (remainderCents * 2n >= discountHundredths ? 1n : 0n)

  return { ok: true, result: { theoreticalCents, safeCents } }
}

export function formatArs(cents) {
  const negative = cents < 0n
  const absoluteCents = negative ? -cents : cents
  const wholePesos = absoluteCents / CENTS_PER_PESO
  const decimalCents = (absoluteCents % CENTS_PER_PESO).toString().padStart(2, '0')
  const groupedPesos = wholePesos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `${negative ? '-' : ''}$${groupedPesos},${decimalCents}`
}
