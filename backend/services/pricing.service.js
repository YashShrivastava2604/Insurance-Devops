export const calculatePremium = (plan, inputs) => {
  let total = plan.basePremium;

  plan.pricingRules.forEach(rule => {
    const value = inputs[rule.field];
    if (value !== undefined) {
      total += value * rule.multiplier;
    }
  });

  console.log("pricing rules: ",plan.pricingRules);
  console.log("inputs: ", inputs);
  console.log("total: ", total);

  return total;
};
