import { Request, Response } from "express";

// @desc Get washrooms
// @route GET /api
// @access Private
const getWashrooms = (req: Request, res: Response) => {
  res.status(200).json({ message: "get washrooms" });
};

// @desc Get washrooms
// @route GET /api
// @access Private
const getWashroom = (req: Request, res: Response) => {
  res.status(200).json({ message: "get washrooms" });
};

// @desc Get washrooms
// @route GET /api
// @access Private
const setWashroom = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: "set washroom" });
};

// @desc Get washrooms
// @route GET /api
// @access Private
const updateWashroom = (req: Request, res: Response) => {
  res.status(200).json({ message: `update washroom ${req.params.id}` });
};

// @desc Get washrooms
// @route GET /api
// @access Private
const deleteWashroom = (req: Request, res: Response) => {
  res.status(200).json({ message: `delete washroom ${req.params.id}` });
};

export {
  getWashrooms,
  getWashroom,
  setWashroom,
  updateWashroom,
  deleteWashroom,
};
