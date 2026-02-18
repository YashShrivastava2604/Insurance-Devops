import Claim from "../models/claim.model.js";

// USER: CREATE CLAIM
export const createClaim = async (req, res) => {
  try{
    const { policyId, amount, reason } = req.body;

    const claim = await Claim.create({
        user: req.user._id,
        policy: policyId,
        amount,
        reason
    });

    res.status(201).json(claim);
  } catch(error){
    console.log(error);
    res.status(400).json({ message: "Failed to create claim" });
  }
};

// USER: MY CLAIMS
export const getMyClaims = async (req, res) => {
  try{
    const claims = await Claim.find({ user: req.user._id }).populate("policy");

    res.json(claims);
  } catch(error){
    console.log(error);
    res.status(500).json({ message: "Failed to fetch claims" });
  }
};

// ADMIN: ALL CLAIMS
export const getAllClaims = async (req, res) => {
  try{
    const claims = await Claim.find()
        .populate("user", "name email")
        .populate("policy");

    res.json(claims);
  } catch(error){
    console.log(error);
    res.status(500).json({ message: "Failed to fetch claims" });
  }
};

// ADMIN: UPDATE STATUS
export const updateClaimStatus = async (req, res) => {
  try{
    const { status } = req.body;

    const claim = await Claim.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!claim)
        return res.status(404).json({ message: "Claim not found" });

    res.json(claim);
  } catch(error){
      console.log(error);
      res.status(500).json({ message: "Failed to fetch claims" });
    }
};
