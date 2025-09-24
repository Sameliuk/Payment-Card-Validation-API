import { validateCard, CardInput } from "../src/validators/cardValidator";

describe("Card Validator", () => {
  it("should validate a correct Visa card", () => {
    const input: CardInput = {
      card_number: "4111111111111111",
      expiration_month: 12,
      expiration_year: 2028,
    };

    const result = validateCard(input);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.cardType).toBe("Visa");
  });

  it("should reject expired card", () => {
    const input: CardInput = {
      card_number: "4111111111111111",
      expiration_month: 1,
      expiration_year: 2021,
    };

    const result = validateCard(input);

    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.message)).toContain("Card is expired");
  });

  it("should reject invalid card number", () => {
    const input: CardInput = {
      card_number: "1111111111111",
      expiration_month: 10,
      expiration_year: 2028,
    };

    const result = validateCard(input);

    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.message)).toContain(
      "Invalid card number (failed Luhn check)",
    );
  });
});
