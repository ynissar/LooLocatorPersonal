"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const washroomRoutes_1 = __importDefault(require("./routes/washroomRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = require("./config/db");
(0, db_1.connectDB)();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api", washroomRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
app.get("/test", (req, res) => {
    res.json({ message: "Connected to backend successfully!" });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
app.post("/post", (req, res) => {
    console.log("request received");
    res.send(req.body);
});
