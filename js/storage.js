// storage.js - localStorage + seed data

export const STORAGE_KEY = "recipes_app_data";

// Generate unique ids
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function safeParseJSON(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch (err) {
    console.warn("Failed to parse recipes from localStorage. Resetting.", err);
    return fallback;
  }
}

/* ========== Seed Data (Veg + Non-veg) ========== */
function getSeedRecipes() {
  const now = new Date().toISOString();

  const butterChicken = {
    id: generateId(),
    title: "Butter Chicken",
    description:
      "Creamy and mildly spiced butter chicken in a rich tomato-based gravy.",
    type: "nonveg",
    ingredients: [
      "500 g boneless chicken, cubed",
      "1/2 cup curd",
      "2 tbsp lemon juice",
      "2 tsp ginger-garlic paste",
      "2 tsp red chilli powder (divided)",
      "1/2 tsp turmeric",
      "2 tbsp butter",
      "2 tbsp oil",
      "3 tomatoes, pureed",
      "1 onion, finely chopped",
      "1 tsp garam masala",
      "1 tsp kasuri methi",
      "1/2 cup fresh cream",
      "Salt & sugar to taste",
    ],
    steps: [
      "Marinate chicken with curd, lemon juice, 1 tsp red chilli powder, turmeric, salt and 1 tsp ginger-garlic paste for at least 30 minutes.",
      "Pan-fry or grill marinated chicken until cooked and slightly charred. Keep aside.",
      "In a pan, heat butter and oil. Add chopped onion and sauté until golden.",
      "Add remaining ginger-garlic paste and sauté for a minute.",
      "Add tomato puree, remaining chilli powder, salt and a pinch of sugar. Cook until oil separates.",
      "Add garam masala, kasuri methi and a little water to adjust consistency.",
      "Add cooked chicken pieces and simmer for 8–10 minutes.",
      "Stir in fresh cream, simmer for 1–2 minutes and turn off heat.",
      "Serve hot with naan, roti or rice.",
    ],
    prepTime: 25,
    cookTime: 30,
    totalTime: 55,
    difficulty: "medium",
    imageUrl:
      "https://imgs.search.brave.com/JcRP27SNufOVWKz2Cmw0AgB59Mh1tAGuY4eoYmd_37U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/ODA5MjU3MS9waG90/by9pbWFnZS1vZi10/dXJxdW9pc2UtYmx1/ZS1jb29raW5nLXBh/bi1maWxsZWQtd2l0/aC1idXR0ZXItY2hp/Y2tlbi10aWtrYS1j/dXJyeS1sYXJnZS1j/aHVua3Mtb2YuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWFz/T25FX3BLSWNlbkJq/SmNwa053VTNVTnVk/T1k2ZEgweEtoR0lL/VWlZTUk9",
    createdAt: now,
    updatedAt: now,
  };
  const simpleTea = {
    id: generateId(),
    title: "Masala Chai (Tea)",
    description: "Quick Indian masala chai for 2 cups.",
    type: "veg",
    ingredients: [
      "1.5 cups water",
      "1 cup milk",
      "2 tsp tea leaves",
      "2–3 tsp sugar",
      "2–3 cardamom pods, crushed",
      "1 small piece ginger, crushed",
    ],
    steps: [
      "Boil water with ginger and cardamom.",
      "Add tea leaves and boil for 1–2 minutes.",
      "Add milk and sugar, simmer 2–3 minutes.",
      "Strain and serve hot.",
    ],
    prepTime: 5,
    cookTime: 7,
    totalTime: 12,
    difficulty: "easy",
    imageUrl:
      "https://imgs.search.brave.com/WFNRhnLnIkUiD8Vx4JVmdvd3Nsexy9WynsbeVkzXigo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNDA4/MTk3NzAwL3N0b2Nr/LXBob3RvLWluZGlh/bi1wb3B1bGFyLWRy/aW5rLW1hc2FsYS1j/aGFpLW1hc2FsYS10/ZWEtdHJhZGl0aW9u/YWwtYmV2ZXJhZ2Ut/YmxhY2s",
    createdAt: now,
    updatedAt: now,
  };

  const quickSandwich = {
    id: generateId(),
    title: "Veg Sandwich",
    description: "Quick vegetable sandwich for breakfast or snack.",
    type: "veg",
    ingredients: [
      "4 bread slices",
      "Butter as needed",
      "1 small onion, sliced",
      "1 small tomato, sliced",
      "1 small cucumber, sliced",
      "Salt & pepper to taste",
    ],
    steps: [
      "Spread butter on bread slices.",
      "Layer onion, tomato and cucumber slices.",
      "Sprinkle salt and pepper.",
      "Cover with another slice and toast or grill if desired.",
    ],
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    difficulty: "easy",
    imageUrl:
      "https://imgs.search.brave.com/SZtEUHFubh58T-e_zX8TBsDD9UvtlNFFRnAAfjsiXyY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZhLzRm/LzZlLzZhNGY2ZTBj/M2M5MWJmYjdkMTA3/ZjE2NGU5NDg4YTNh/LmpwZw",
    createdAt: now,
    updatedAt: now,
  };

  const vegPulao = {
    id: generateId(),
    title: "Veg Pulao",
    description:
      "Aromatic one-pot vegetable pulao cooked with basmati rice and whole spices.",
    type: "veg",
    ingredients: [
      "1 cup basmati rice (soaked 20 mins)",
      "2 tbsp oil or ghee",
      "1 bay leaf",
      "4 cloves",
      "4 black peppercorns",
      "1 inch cinnamon stick",
      "1 cardamom pod",
      "1 medium onion, sliced",
      "1 small carrot, chopped",
      "1/4 cup green peas",
      "5–6 French beans, chopped",
      "2.5 cups water",
      "Salt to taste",
      "Fresh coriander & fried onions for garnish (optional)",
    ],
    steps: [
      "Rinse basmati rice well and soak for 20 minutes. Drain and keep aside.",
      "Heat oil or ghee in a pan or pressure cooker. Add bay leaf, cloves, peppercorns, cinnamon and cardamom.",
      "Add sliced onions and sauté until light golden.",
      "Add chopped carrot, beans and peas. Sauté for 2–3 minutes.",
      "Add soaked rice and gently sauté for 1–2 minutes.",
      "Pour in water, add salt, and mix gently.",
      "Cook covered until rice is done and water is absorbed (or 1–2 whistles in a pressure cooker).",
      "Fluff gently with a fork. Garnish with coriander and fried onions if using. Serve hot with raita.",
    ],
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    difficulty: "medium",
    imageUrl:
      "https://imgs.search.brave.com/05qAKb-jz7L3bmIiuS6dTeeg7dxqCvuXuOk_HgfyOvw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVt/YWRzY2llbnRpc3Rz/a2l0Y2hlbi5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDQvUXVpY2stVmVn/LVB1bGFvLmpwZWc",
    createdAt: now,
    updatedAt: now,
  };

  const chickenBiryani = {
    id: generateId(),
    title: "Chicken Biryani",
    description:
      "Fragrant layered chicken biryani cooked with basmati rice and spices.",
    type: "nonveg",
    ingredients: [
      "500 g chicken, bone-in pieces",
      "1.5 cups basmati rice",
      "3 tbsp oil or ghee",
      "2 large onions, sliced",
      "2 tomatoes, chopped",
      "1/2 cup curd",
      "2 tsp ginger-garlic paste",
      "2–3 green chillies, slit",
      "2 tsp biryani masala",
      "1 tsp red chilli powder",
      "1/2 tsp turmeric",
      "Whole spices (bay leaf, cloves, cinnamon, cardamom)",
      "Fresh coriander & mint leaves",
      "Salt to taste",
      "Water as needed",
    ],
    steps: [
      "Rinse and soak basmati rice for 20 minutes.",
      "Marinate chicken with curd, ginger-garlic paste, chilli powder, turmeric, biryani masala and salt for 30 minutes.",
      "Fry sliced onions in oil/ghee until golden and crisp. Keep half aside for garnish.",
      "In the same pan, add whole spices, green chillies and tomatoes. Cook until tomatoes soften.",
      "Add marinated chicken and cook until chicken is almost done.",
      "Parboil soaked rice with salt and drain when 70% cooked.",
      "Layer rice over the chicken, top with fried onions, coriander and mint.",
      "Cover tightly and cook on low flame (dum) for 15–20 minutes.",
      "Fluff gently and serve hot with raita and salad.",
    ],
    prepTime: 30,
    cookTime: 40,
    totalTime: 70,
    difficulty: "hard",
    imageUrl:
      "https://imgs.search.brave.com/TgzxACdt-BK9X9Cgd3fAy7xTNA4MQZtQAHmK2Mp3pKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/NzEzLzYzNS9zbWFs/bC9mcmFncmFudC1m/bGF2b3JmdWwtY2hp/Y2tlbi1iaXJ5YW5p/LWNyb3duZWQtd2l0/aC1mcmllZC1vbmlv/bnMtZnJlZS1waG90/by5qcGc",
    createdAt: now,
    updatedAt: now,
  };

  const chickenMasala = {
    id: generateId(),
    title: "Chicken Masala",
    description:
      "Creamy and mildly spiced butter chicken in a rich tomato-based gravy.",
    type: "nonveg",
    ingredients: [
      "500 g boneless chicken, cubed",
      "1/2 cup curd",
      "2 tbsp lemon juice",
      "2 tsp ginger-garlic paste",
      "2 tsp red chilli powder (divided)",
      "1/2 tsp turmeric",
      "2 tbsp butter",
      "2 tbsp oil",
      "3 tomatoes, pureed",
      "1 onion, finely chopped",
      "1 tsp garam masala",
      "1 tsp kasuri methi",
      "1/2 cup fresh cream",
      "Salt & sugar to taste",
    ],
    steps: [
      "Marinate chicken with curd, lemon juice, 1 tsp red chilli powder, turmeric, salt and 1 tsp ginger-garlic paste for at least 30 minutes.",
      "Pan-fry or grill marinated chicken until cooked and slightly charred. Keep aside.",
      "In a pan, heat butter and oil. Add chopped onion and sauté until golden.",
      "Add remaining ginger-garlic paste and sauté for a minute.",
      "Add tomato puree, remaining chilli powder, salt and a pinch of sugar. Cook until oil separates.",
      "Add garam masala, kasuri methi and a little water to adjust consistency.",
      "Add cooked chicken pieces and simmer for 8–10 minutes.",
      "Stir in fresh cream, simmer for 1–2 minutes and turn off heat.",
      "Serve hot with naan, roti or rice.",
    ],
    prepTime: 25,
    cookTime: 30,
    totalTime: 55,
    difficulty: "medium",
    imageUrl:
      "https://imgs.search.brave.com/JcRP27SNufOVWKz2Cmw0AgB59Mh1tAGuY4eoYmd_37U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/ODA5MjU3MS9waG90/by9pbWFnZS1vZi10/dXJxdW9pc2UtYmx1/ZS1jb29raW5nLXBh/bi1maWxsZWQtd2l0/aC1idXR0ZXItY2hp/Y2tlbi10aWtrYS1j/dXJyeS1sYXJnZS1j/aHVua3Mtb2YuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWFz/T25FX3BLSWNlbkJq/SmNwa053VTNVTnVk/T1k2ZEgweEtoR0lL/VWlZTUk9",
    createdAt: now,
    updatedAt: now,
  };

  return [
    butterChicken,
    simpleTea,
    quickSandwich,
    vegPulao,
    chickenBiryani,
    chickenMasala,
  ];
}

export function loadRecipes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = getSeedRecipes();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  const parsed = safeParseJSON(stored, null);
  if (!parsed) {
    const seeded = getSeedRecipes();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  return parsed;
}

export function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}