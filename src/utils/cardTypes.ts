export function luhnCheck(pan: string): boolean {
  let sum = 0;
  let shouldDouble = false;
  for (let i = pan.length - 1; i >= 0; i--) {
    let digit = parseInt(pan.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function determineCardType(pan: string): string | null {
  if (!pan || !/^[0-9]+$/.test(pan)) return null;

  if (/^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/.test(pan)) return "Visa";
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      pan,
    )
  )
    return "Mastercard";
  if (/^3[47][0-9]{13}$/.test(pan)) return "American Express";
  if (
    /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))[0-9]*$/.test(
      pan,
    )
  )
    return "Discover";

  return "Unknown";
}

export function maskCard(pan: string): string {
  const digits = pan.replace(/\D/g, "");
  return "*".repeat(Math.max(0, digits.length - 4)) + digits.slice(-4);
}
