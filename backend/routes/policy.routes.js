import express from "express";
import {
  calculatePrice,
  buyPolicy,
  getMyPolicies
} from "../controllers/policy.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/calculate", protectRoute, calculatePrice);
router.post("/buy", protectRoute, buyPolicy);
router.get("/mine", protectRoute, getMyPolicies);

export default router;