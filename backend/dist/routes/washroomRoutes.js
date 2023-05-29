"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const washroomController_1 = require("../controllers/washroomController");
let router = express_1.default.Router();
router.get("/", washroomController_1.getWashrooms);
router.post("/", washroomController_1.setWashroom);
router.put("/:id", washroomController_1.updateWashroom);
router.delete("/:id", washroomController_1.deleteWashroom);
exports.default = router;
