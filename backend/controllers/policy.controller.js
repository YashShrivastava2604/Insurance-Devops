import Plan from '../models/plan.model.js'
import Policy from '../models/policy.model.js'
import { calculatePremium } from '../services/pricing.service.js'

export const calculatePrice = async (req, res) => {
    try {
        const { planId, inputs } = req.body;

        const plan = await Plan.findById(planId);
        if(!plan) return res.status(404).json({ message: "Plan not found" });

        const premium = calculatePremium(plan, inputs);

        res.status(200).json({ premium });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to calculate premium"})
    }
};

export const buyPolicy = async (req, res) => {
    try{
        const { planId, inputs } = req.body;

        const plan = await Plan.findById(planId);
        if(!plan) return res.json({ message: "Plan not found" });

        const premium = calculatePremium(plan, inputs);

        const policy = await Policy.create({
            user: req.user._id,
            plan: planId,
            inputs,
            premium,
            coverage: plan.coverage,
            duration: plan.duration
        });

        res.status(201).json(policy);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Failed to buy policy" });
    }
}

export const getMyPolicies = async (req, res) => {
    try{
        const policies = await Policy.find({ user: req.user._id }).populate("plan");
        res.json(policies);
    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Failed to fetch policies" });
    }
}
