import express, { Request, Response } from "express";

import {
  deleteWashroom,
  getWashroom,
  getWashrooms,
  setWashroom,
  updateWashroom,
} from "../controllers/washroomController";

let router = express.Router();

router.get("/", getWashrooms);

router.get("/:id", getWashroom);

router.post("/", setWashroom);

router.put("/:id", updateWashroom);

router.delete("/:id", deleteWashroom);

export default router;
