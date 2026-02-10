import express from "express";
import {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus
} from "../controllers/claim.controller.js";

import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// user
router.post("/", protectRoute, createClaim);
router.get("/mine", protectRoute, getMyClaims);

// admin
router.get("/", protectRoute, adminRoute, getAllClaims);
router.put("/:id", protectRoute, adminRoute, updateClaimStatus);

export default router;
