"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.washroomModel = void 0;
const mongoose_1 = require("mongoose");
const washroomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    coordinates: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    },
    street: { type: String, required: true },
    accessibleWashroom: Boolean,
    description: { type: String, required: true },
});
const washroomModel = (0, mongoose_1.model)("washroomModel", washroomSchema);
exports.washroomModel = washroomModel;
