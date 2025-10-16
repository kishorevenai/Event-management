import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOption.js";

//Routes
import { EventRoute } from "./routes/eventRoutes.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();

setupSwagger(app);

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use("/v1/events", EventRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
