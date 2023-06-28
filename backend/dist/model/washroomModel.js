"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.washroomModel = void 0;
const mongoose_1 = require("mongoose");
const washroomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    numberOfRaters: { type: Number, required: true },
    coordinates: {
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
    },
    street: { type: String, required: true },
    accessibility: {
        genderless: Boolean,
        childFriendly: Boolean,
        disabilityFriendly: Boolean,
    },
    traitRatings: {
        clean: Number,
        safe: Number,
        private: Number,
        wellSupplied: Number,
    },
});
const washroomModel = (0, mongoose_1.model)("washroomModel", washroomSchema);
exports.washroomModel = washroomModel;
