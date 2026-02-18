import express from "express";
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan
} from "../controllers/plan.controller.js";

import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getPlans);
router.get("/:id", getPlanById);

router.post("/", protectRoute, adminRoute, createPlan);
router.put("/:id", protectRoute, adminRoute, updatePlan);
router.delete("/:id", protectRoute, adminRoute, deletePlan);

export default router;