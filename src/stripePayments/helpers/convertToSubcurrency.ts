//NO TOCAR, ESTO ES DE PAGOS STRIPE

function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export default convertToSubcurrency;
