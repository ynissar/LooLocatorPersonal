import express, { Request, Response } from "express";

import {
  deleteWashroom,
  getWashrooms,
  setWashroom,
  updateWashroom,
} from "../controllers/washroomController";

let router = express.Router();

router.get("/", getWashrooms);

router.post("/", setWashroom);

router.put("/:id", updateWashroom);

router.delete("/:id", deleteWashroom);

export default router;
