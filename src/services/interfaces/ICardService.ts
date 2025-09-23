import { ValidationResult, CardInput } from '../../validators/cardValidator.js';

export interface ICardService {
  validateCard(input: CardInput): ValidationResult;
  getCardType(cardNumber: string): string | null;
  maskCard(cardNumber: string): string;
}
