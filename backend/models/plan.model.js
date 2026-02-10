import mongoose from 'mongoose'

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["health", "life", "car", "term", "travel", "family"],
    required: true
  },
  basePremium: {
    type: Number,
    required: true
  },
  coverage: {
    type: Number,
    required: true
},
duration: {
  type: Number, 
  required: true
},
  fields: [
    {
      name: String, 
      label: String, 
      type: {
        type: String,
        enum: ["number", "string"],
        default: "number"
      }
    }
  ],
  pricingRules: [
    {
      field: String,     // age, vehicleAge, membersCount
      multiplier: Number
    }
  ],
  benefits: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema)

export default Plan