"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
// swaggerOptions.js
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation for OMNIFY app",
        },
        servers: [
            {
                url: "http://localhost:3000", // your backend URL
            },
        ],
    },
    apis: ["./routes/*.js", "./routes/*.ts"], // paths to your route files
};
