import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { washroomModel } from "../model/washroomModel";

// @desc Get washrooms
// @route GET /api
// @access Private
const getWashrooms = asyncHandler(async (req: Request, res: Response) => {
  const washrooms = await washroomModel.find();
  res.status(200).json({ washrooms });
});

// @desc Get washrooms
// @route GET /api
// @access Private
const getWashroom = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `get washroom ${req.params.id}` });
});

// @desc set washrooms
// @route POST /api
// @access Private
const setWashroom = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add first name");
  }

  const washroom = await washroomModel.create({
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
});

// @desc update washroom
// @route PUT /api
// @access Private
const updateWashroom = asyncHandler(async (req: Request, res: Response) => {
  const washroom = await washroomModel.findById(req.params.id);

  if (!washroom) {
    res.status(400);
    throw new Error("Could not find washroom");
  }

  const updatedWashroom = await washroomModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ updatedWashroom });
});

// @desc delete washroom
// @route DELETE /api
// @access Private
const deleteWashroom = asyncHandler(async (req: Request, res: Response) => {
  const washroom = await washroomModel.findById(req.params.id);

  if (!washroom) {
    res.status(400);
    throw new Error("Could not find washroom");
  }

  await washroomModel.findByIdAndRemove(req.params.id);

  res.status(200).json({ message: "deleted washroom" });
});

export {
  getWashrooms,
  getWashroom,
  setWashroom,
  updateWashroom,
  deleteWashroom,
};
