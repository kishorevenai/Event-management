"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = exports.swaggerOptions = void 0;
// src/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerOptions = {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log("📚 Swagger docs available at http://localhost:3000/api-docs");
};
exports.setupSwagger = setupSwagger;
