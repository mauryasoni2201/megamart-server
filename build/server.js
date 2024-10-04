"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const db_1 = __importDefault(require("./db/db"));
(0, db_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const route_1 = __importDefault(require("./route/route"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/orders", route_1.default);
app.listen(process.env.PORT, () => {
    console.log(`App running at ${process.env.PORT}!`);
});
