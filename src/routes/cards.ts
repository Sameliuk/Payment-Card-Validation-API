import { Router } from 'express';
import { CardService } from '../services/CardService.js';
import { CardInput } from '../validators/cardValidator.js';

const router = Router();
const cardService = new CardService();

router.post('/validate', (req, res) => {
    const input = req.body as CardInput;

    try {
        const result = cardService.validateCard(input);

        if (!result.valid) {
            return res
                .status(400)
                .json({ is_valid: false, errors: result.errors });
        }

        return res.json({
            is_valid: true,
            card_number: cardService.maskCard(result.cardNumber!),
            card_type: result.cardType,
        });
    } catch (err: unknown) {
        const error = err as { status?: number; message?: string };
        return res
            .status(error.status ?? 500)
            .json({ error: error.message ?? 'Internal Server Error' });
    }
});

export default router;
