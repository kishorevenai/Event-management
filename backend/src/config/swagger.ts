// src/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OMNIFY API",
      version: "1.0.0",
      description: "API documentation for OMNIFY app",
    },
    servers: [
      {
        url: "http://localhost:3000/v1",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/Controllers/*.ts"], // Update paths based on your structure
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📚 Swagger docs available at http://localhost:3000/api-docs");
};
