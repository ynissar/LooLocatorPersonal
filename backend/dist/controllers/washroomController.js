"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWashroom = exports.updateWashroom = exports.setWashroom = exports.getWashroom = exports.getWashrooms = void 0;
// @desc Get washrooms
// @route GET /api
// @access Private
const getWashrooms = (req, res) => {
    res.status(200).json({ message: "get washrooms" });
};
exports.getWashrooms = getWashrooms;
// @desc Get washrooms
// @route GET /api
// @access Private
const getWashroom = (req, res) => {
    res.status(200).json({ message: "get washrooms" });
};
exports.getWashroom = getWashroom;
// @desc Get washrooms
// @route GET /api
// @access Private
const setWashroom = (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "set washroom" });
};
exports.setWashroom = setWashroom;
// @desc Get washrooms
// @route GET /api
// @access Private
const updateWashroom = (req, res) => {
    res.status(200).json({ message: `update washroom ${req.params.id}` });
};
exports.updateWashroom = updateWashroom;
// @desc Get washrooms
// @route GET /api
// @access Private
const deleteWashroom = (req, res) => {
    res.status(200).json({ message: `delete washroom ${req.params.id}` });
};
exports.deleteWashroom = deleteWashroom;
