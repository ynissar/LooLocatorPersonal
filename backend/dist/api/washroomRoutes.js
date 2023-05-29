"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).json({ message: "get washrooms" });
});
router.post("/", (req, res) => {
    res.status(200).json({ message: "set washroom" });
});
router.put("/:id", (req, res) => {
    res.status(200).json({ message: `update washroom ${req.params.id}` });
});
router.delete("/:id", (req, res) => {
    res.status(200).json({ message: `delete washroom ${req.params.id}` });
});
exports.default = router;
