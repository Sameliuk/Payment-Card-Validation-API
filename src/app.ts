import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import cors from 'cors';
import cardsRouter from './routes/cards.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { sanitizeRequest } from './middlewares/sanitize.js';

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '2kb' }));
app.use(sanitizeRequest);

// Rate limiting
const limiter = rateLimit({ windowMs: 60_000, max: 60 });
app.use(limiter);

app.get('/', (_req, res) =>
    res.json({ service: 'Payment Card Validation API' })
);
app.use('/card', cardsRouter);
app.use(errorHandler);

export default app;
