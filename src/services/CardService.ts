import { ICardService } from "./interfaces/ICardService.js";
import {
  validateCard,
  ValidationResult,
  CardInput,
} from "../validators/cardValidator.js";
import {
  determineCardType,
  maskCard as maskCardUtil,
} from "../utils/cardTypes.js";

export class CardService implements ICardService {
  validateCard(input: CardInput): ValidationResult {
    const result = validateCard(input);
    if (result.valid && result.cardNumber) {
      result.cardType = determineCardType(result.cardNumber);
    }
    return result;
  }

  getCardType(cardNumber: string): string | null {
    return determineCardType(cardNumber);
  }

  maskCard(cardNumber: string): string {
    return maskCardUtil(cardNumber);
  }
}
