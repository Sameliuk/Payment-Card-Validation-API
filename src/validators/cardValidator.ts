import { luhnCheck } from '../utils/cardTypes.js';

export type CardInput = {
    card_number?: string | number;
    expiration_month?: number;
    expiration_year?: number;
};

export type ValidationError = {
    field: string;
    message: string;
};

export type ValidationResult = {
    valid: boolean;
    errors: ValidationError[];
    cardType?: string | null;
    cardNumber?: string;
};

export function validateCard(input: CardInput): ValidationResult {
    const errors: ValidationError[] = [];

    if (!input || typeof input !== 'object') {
        throw { status: 400, message: 'Invalid JSON body' };
    }

    // --- Normalize input ---
    const rawNumber = (input.card_number ?? '').toString().replace(/\s+/g, '');
    const expMonth = Number(input.expiration_month);
    const expYear = Number(input.expiration_year);

    // --- Card number validation ---
    if (!rawNumber) {
        errors.push({
            field: 'card_number',
            message: 'Card number is required',
        });
    } else if (!/^\d{12,19}$/.test(rawNumber)) {
        errors.push({
            field: 'card_number',
            message: 'Card number must contain 12 to 19 digits',
        });
    } else if (!luhnCheck(rawNumber)) {
        errors.push({
            field: 'card_number',
            message: 'Invalid card number (failed Luhn check)',
        });
    }

    // --- Expiration month validation ---
    if (!Number.isInteger(expMonth) || expMonth < 1 || expMonth > 12) {
        errors.push({
            field: 'expiration_month',
            message: 'Expiration month must be between 1 and 12',
        });
    }

    // --- Expiration year validation ---
    if (!Number.isInteger(expYear) || expYear < 0) {
        errors.push({
            field: 'expiration_year',
            message: 'Expiration year must be a valid year',
        });
    } else if (Number.isInteger(expMonth) && expMonth >= 1 && expMonth <= 12) {
        const fullYear = expYear < 100 ? 2000 + expYear : expYear;
        const expDate = new Date(fullYear, expMonth, 0, 23, 59, 59, 999);
        const now = new Date();
        if (expDate < now) {
            errors.push({
                field: 'expiration_year',
                message: 'Card is expired',
            });
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        cardType: undefined,
        cardNumber: rawNumber || undefined,
    };
}
