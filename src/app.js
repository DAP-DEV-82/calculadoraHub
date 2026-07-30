import './styles.css'
import { evaluateCalculation, formatArs } from './calculator.js'

const fields = {
  discount: {
    input: document.querySelector('#discount'),
    message: document.querySelector('#discount-error'),
  },
  cap: {
    input: document.querySelector('#cap'),
    message: document.querySelector('#cap-error'),
  },
}
const clearButton = document.querySelector('#clear')
const results = document.querySelector('#results')
const theoreticalResult = document.querySelector('#theoretical-result')
const safeResult = document.querySelector('#safe-result')
const calculatorStatus = document.querySelector('#calculator-status')
const touched = { discount: false, cap: false }

const errorMessages = {
  discount: {
    required: 'Ingresa el porcentaje de descuento.',
    incomplete: 'Completa el número con hasta dos decimales.',
    'too-many-decimals': 'Usa como máximo dos decimales.',
    'invalid-format': 'Ingresa un porcentaje válido sin signos ni separadores de miles.',
    'out-of-range': 'El porcentaje debe ser mayor que 0 y menor o igual que 100.',
  },
  cap: {
    required: 'Ingresa el tope de reintegro.',
    incomplete: 'Completa el número con hasta dos decimales.',
    'too-many-decimals': 'Usa como máximo dos decimales.',
    'invalid-format': 'Ingresa un tope válido sin signos ni separadores de miles.',
    'out-of-range': 'El tope debe ser mayor que 0 y no superar $999.999.999,99.',
  },
}

function visibleError(fieldName, error) {
  const field = fields[fieldName]

  if (!touched[fieldName] || !error) return null
  if (error === 'incomplete' && document.activeElement === field.input) return null

  return errorMessages[fieldName][error]
}

function render() {
  const evaluation = evaluateCalculation({
    discountRaw: fields.discount.input.value,
    capRaw: fields.cap.input.value,
  })
  const visibleErrors = []

  for (const fieldName of Object.keys(fields)) {
    const error = evaluation.ok ? null : evaluation.errors[fieldName]
    const message = visibleError(fieldName, error)
    const field = fields[fieldName]

    field.message.hidden = !message
    field.message.textContent = message ?? ''
    if (message) {
      field.input.setAttribute('aria-invalid', 'true')
      visibleErrors.push(message)
    } else {
      field.input.removeAttribute('aria-invalid')
    }
  }

  if (evaluation.ok) {
    const theoretical = formatArs(evaluation.result.theoreticalCents)
    const safe = formatArs(evaluation.result.safeCents)

    theoreticalResult.textContent = theoretical
    safeResult.textContent = safe
    results.hidden = false
    calculatorStatus.textContent = `Monto teórico de compra: ${theoretical}. Máximo seguro de compra: ${safe}.`
    return
  }

  results.hidden = true
  calculatorStatus.textContent = visibleErrors.join(' ')
}

for (const [fieldName, field] of Object.entries(fields)) {
  field.input.addEventListener('input', () => {
    touched[fieldName] = true
    render()
  })
  field.input.addEventListener('blur', () => {
    touched[fieldName] = true
    render()
  })
}

clearButton.addEventListener('click', () => {
  fields.discount.input.value = ''
  fields.cap.input.value = ''
  touched.discount = false
  touched.cap = false
  render()
})

render()
