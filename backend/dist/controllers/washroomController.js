"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWashroom = exports.updateWashroom = exports.setWashroom = exports.getWashroom = exports.getWashrooms = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const washroomModel_1 = require("../model/washroomModel");
// @desc Get washrooms
// @route GET /api
// @access Private
const getWashrooms = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const washrooms = yield washroomModel_1.washroomModel.find();
    res.status(200).json({ washrooms });
}));
exports.getWashrooms = getWashrooms;
// @desc Get washrooms
// @route GET /api
// @access Private
const getWashroom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: `get washroom ${req.params.id}` });
}));
exports.getWashroom = getWashroom;
// @desc set washrooms
// @route POST /api
// @access Private
const setWashroom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        res.status(400);
        throw new Error("please add first name");
    }
    const washroom = yield washroomModel_1.washroomModel.create({
        name: req.body.name,
        coordinates: {
            x: req.body.coordinates.x,
            y: req.body.coordinates.y,
        },
        street: req.body.street,
        accessibleWashroom: req.body.accessibleWashroom,
        description: req.body.description,
    });
    res.status(200).json({ washroom });
}));
exports.setWashroom = setWashroom;
// @desc update washroom
// @route PUT /api
// @access Private
const updateWashroom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const washroom = yield washroomModel_1.washroomModel.findById(req.params.id);
    if (!washroom) {
        res.status(400);
        throw new Error("Could not find washroom");
    }
    const updatedWashroom = yield washroomModel_1.washroomModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ updatedWashroom });
}));
exports.updateWashroom = updateWashroom;
// @desc delete washroom
// @route DELETE /api
// @access Private
const deleteWashroom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const washroom = yield washroomModel_1.washroomModel.findById(req.params.id);
    if (!washroom) {
        res.status(400);
        throw new Error("Could not find washroom");
    }
    yield washroomModel_1.washroomModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "deleted washroom" });
}));
exports.deleteWashroom = deleteWashroom;
