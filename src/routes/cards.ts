import { Router, Request, Response } from 'express';
import { CardService } from '../services/CardService.js';
import { CardInput } from '../validators/cardValidator.js';

const router = Router();
const cardService = new CardService();

router.post('/validate', (req: Request, res: Response) => {
  const input = req.body as CardInput;

  try {
    const result = cardService.validateCard(input);

    if (!result.valid || !result.cardNumber) {
      return res.status(400).json({
        is_valid: false,
        errors: result.errors,
      });
    }

    const maskedCard = cardService.maskCard(result.cardNumber);
    const cardType = result.cardType ?? null;

    return res.json({
      is_valid: true,
      card_number: maskedCard,
      card_type: cardType,
    });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    return res.status(error.status ?? 500).json({
      error: error.message ?? 'Internal Server Error',
    });
  }
});

export default router;
