// validation.js - pure validation

export function validateRecipeForm(data) {
  const errors = [];

  if (!data.title.trim()) errors.push("Title is required.");
  if (!data.description.trim()) errors.push("Description is required.");
  if (!data.ingredientsRaw.trim())
    errors.push("At least one ingredient is required.");
  if (!data.stepsRaw.trim()) errors.push("At least one step is required.");

  const prepNum = Number(data.prepTime);
  const cookNum = Number(data.cookTime);

  if (data.prepTime === "" || isNaN(prepNum) || prepNum < 0) {
    errors.push("Prep time must be a non-negative number.");
  }
  if (data.cookTime === "" || isNaN(cookNum) || cookNum < 0) {
    errors.push("Cook time must be a non-negative number.");
  }

  if (!data.difficulty) errors.push("Difficulty is required.");
  if (!data.type) errors.push("Please select whether the dish is Veg or Non-veg.");

  return {
    isValid: errors.length === 0,
    errors,
  };
}