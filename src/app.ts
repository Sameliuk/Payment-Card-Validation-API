import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cors from "cors";
import cardsRouter from "./routes/cards.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { sanitizeRequest } from "./middlewares/sanitize.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "2kb" }));
app.use(sanitizeRequest);

app.use(rateLimit({ windowMs: 60_000, max: 60 }));

app.get("/", (_req, res) =>
  res.json({ service: "Payment Card Validation API" }),
);

app.use("/card", cardsRouter);

// Swagger/OpenAPI
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let openapi;
try {
  openapi = YAML.load(join(__dirname, "./docs/openapi.yaml"));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
} catch (err) {
  console.error("Failed to load OpenAPI document:", err);
}

app.use(errorHandler);

export default app;
