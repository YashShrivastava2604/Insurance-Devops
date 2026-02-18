import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },

  inputs: {
    type: Object,
    required: true
  },

  premium: {
    type: Number,
    required: true
  },

  coverage: Number,
  duration: Number,

  status: {
    type: String,
    default: "active"
  }

}, { timestamps: true });

export default mongoose.model("Policy", policySchema);