# Payment Card Validation API

## Overview
This is a RESTful API for validating payment card data.  
It checks:
- Card number validity
- Expiration date
- Luhn algorithm
- Returns card type information

---

## Features
- Card validation with detailed error messages
- Structured response: `{ is_valid, errors, card_type, card_number }`
- Security: helmet, CORS, rate limiting, request sanitization
- Dockerized
- TypeScript + Node.js + Express

---

## Requirements
- Node.js >= 18
- npm >= 9
- Docker 

---

## Setup

### 1. Clone repository
```
git clone https://github.com/Sameliuk/Payment-Card-Validation-API.git
cd payment-card-validation
```

### 2. Install dependencies
```
npm install
```

### 3. Run in development mode
```
npm run dev
```

Server will start at http://localhost:3000

### 4. Build & run production
```
npm run build
npm start
```

## Docker
Build Docker image
```
docker build -t card-validation-api .
```

### Run container
```
docker run -p 3000:3000 card-validation-api
```

## API Endpoints

> POST /card/validate

Validates a payment card.

Request body:

```
{
  "card_number": "5555555555554444",
  "expiration_month": "01",
  "expiration_year": "2026"
}
```

Response body:

```
{
  "is_valid": true,
  "card_number": "************4444",
  "card_type": "Mastercard"
}
```

## Testing

Run tests with Jest:
```
npm run test
```

## Swagger/OpenAPI Documentation

Swagger is served at:

[http://localhost:3000/docs](http://localhost:3000/docs)

## Code Style

ESLint and Prettier are used for consistent formatting.

TypeScript is configured with strict type checking.
