import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOption.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger.js";
//Routes
import { EventRoute } from "./routes/eventRoutes.js";

const app = express();

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use("/v1/events", EventRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
