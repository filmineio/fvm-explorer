/**
 * Formats number for USD
 * @param value
 * @param replaceDoubleZero Should get rid of cents
 * @param  cents  Value is in cents, and it should be converted to dollars
 * @returns
 */
export function formatCurrency(value: number, replaceDoubleZero?: boolean) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  if (replaceDoubleZero) {
    return formattedValue.replace(".00", "");
  }
  return formattedValue;
}

export function calculateValuation(
  totalValuation: number,
  shortBillion?: boolean,
  cents?: boolean
) {
  const divider = cents ? 100000000000 : 1000000000;

  return `$${totalValuation / divider} ${shortBillion ? "B" : "Billion"}`;
}

export function fromCents(amountInCents: number) {
  return amountInCents / 100;
}
