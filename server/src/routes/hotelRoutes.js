import express from "express";
import { getAllHotels } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/hotels", getAllHotels);

export default router;
