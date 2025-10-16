"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsOption_js_1 = require("./config/corsOption.js");
//Routes
const eventRoutes_js_1 = require("./routes/eventRoutes.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption_js_1.corsOptions));
const PORT = process.env.PORT;
app.use("/v1/events", eventRoutes_js_1.EventRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
