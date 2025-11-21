// validation.js - form validation logic (pure functions, no DOM access)

export function validateForm(formData) {
  const errors = [];
  const title = (formData.title || "").trim();
  const description = (formData.description || "").trim();
  const ingredients = Array.isArray(formData.ingredients) ? formData.ingredients : [];
  const steps = Array.isArray(formData.steps) ? formData.steps : [];
  const prep = formData.prepTime;
  const cook = formData.cookTime;
  const difficulty = formData.difficulty;
  const type = formData.type;

  if (!title) errors.push("Title is required.");
  if (!description) errors.push("Description is required.");
  if (!ingredients.length) errors.push("At least one ingredient is required.");
  if (!steps.length) errors.push("At least one step is required.");

  const prepNum = Number(prep);
  const cookNum = Number(cook);

  if (prep === "" || isNaN(prepNum) || prepNum < 0) {
    errors.push("Prep time must be a non-negative number.");
  }
  if (cook === "" || isNaN(cookNum) || cookNum < 0) {
    errors.push("Cook time must be a non-negative number.");
  }

  if (!difficulty) errors.push("Difficulty is required.");
  if (!type) errors.push("Please select whether the dish is Veg or Non-veg.");

  return { isValid: errors.length === 0, errors };
}
