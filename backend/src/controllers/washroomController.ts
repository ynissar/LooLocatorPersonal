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

// @desc Get a washroom
// @route GET /api
// @access Private
const getWashroom = asyncHandler(async (req: Request, res: Response) => {
  const washroom = await washroomModel.findById(req.params.id);
  res.status(200).json({ washroom });
});

// @desc set a washroom
// @route POST /api
// @access Private
const setWashroom = asyncHandler(async (req: Request, res: Response) => {
  //! ADD DATA VALIDATION

  const washroom = await washroomModel.create({
    name: req.body.name,
    rating: req.body.rating,
    numberOfRaters: req.body.numberOfRaters,
    coordinates: {
      longitude: req.body.coordinates.longitude,
      latitude: req.body.coordinates.latitude,
    },
    street: req.body.street,
    accessibility: {
      genderless: req.body.accessibility.genderless,
      childFriendly: req.body.accessibility.childFriendly,
      disabilityFriendly: req.body.accessibility.disabilityFriendly,
    },
    traitRatings: {
      clean: req.body.traitRatings.clean,
      safe: req.body.traitRatings.safe,
      privacy: req.body.traitRatings.privacy,
      wellSupplied: req.body.traitRatings.wellSupplied,
    },
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
