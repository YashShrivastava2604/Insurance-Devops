import Plan from "../models/plan.model.js";

export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    console.log(plan)
    res.status(201).json(plan);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Failed to create plan" });
  }
};

export const getPlans = async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const plans = await Plan.find(filter);
    res.json(plans);
  } catch {
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan)
      return res.status(404).json({ message: "Plan not found" });

    res.json(plan);
  } catch {
    res.status(400).json({ message: "Invalid plan id" });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!plan)
      return res.status(404).json({ message: "Plan not found" });

    res.json(plan);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

// ================= DELETE PLAN (ADMIN) =================
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);

    if (!plan)
      return res.status(404).json({ message: "Plan not found" });

    res.json({ message: "Plan deleted successfully" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};
