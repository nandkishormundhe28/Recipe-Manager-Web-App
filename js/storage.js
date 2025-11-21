// storage.js - localStorage and seed data
const STORAGE_KEY = "recipes_dark_app_v3_slider";

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

export function loadRecipes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = getSeedRecipes();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded)); } catch (e) { console.warn("Could not write seed to localStorage.", e); }
    return seeded;
  }

  const parsed = safeParseJSON(stored, null);
  if (!parsed) {
    const seeded = getSeedRecipes();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded)); } catch (e) { console.warn("Could not write seed to localStorage.", e); }
    return seeded;
  }

  return parsed;
}

export function saveRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (e) {
    console.warn("Failed to save recipes to localStorage:", e);
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getSeedRecipes() {
  const now = new Date().toISOString();

  const butterChickenRecipe = {
    id: generateId(),
    title: "Butter Chicken",
    description: "Creamy and mildly spiced butter chicken for 2 people – tender marinated chicken simmered in a rich tomato-cream gravy.",
    type: "nonveg",
    ingredients: [
      "300 g boneless chicken, cubed",
      "1/2 cup curd",
      "1 tbsp lemon juice",
      "1.5 tsp ginger–garlic paste",
      "1.5 tsp red chilli powder (adjust to taste)",
      "1/2 tsp turmeric powder",
      "1 tsp garam masala",
      "2 tbsp butter",
      "1 tbsp oil",
      "2 medium tomatoes, pureed",
      "1 small onion, finely chopped",
      "1/2 cup fresh cream",
      "1 tsp kasuri methi (optional)",
      "1/2 tsp sugar",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    steps: [
      "In a bowl, combine curd, lemon juice, 1/2 tsp ginger–garlic paste, 1 tsp red chilli powder, turmeric and salt. Add chicken and marinate for at least 30 minutes.",
      "Pan-fry or grill the marinated chicken pieces until partially cooked and slightly charred. Keep aside.",
      "Heat butter and oil in a pan. Add chopped onion and sauté until golden brown.",
      "Add remaining ginger–garlic paste and sauté for 1 minute.",
      "Add tomato puree and cook until the oil separates from the masala (5–7 minutes).",
      "Add remaining red chilli powder, garam masala, sugar and a little water to adjust consistency. Simmer for 2–3 minutes.",
      "Add the partially cooked chicken, cover and simmer for 8–10 minutes until chicken is cooked through.",
      "Stir in fresh cream and kasuri methi, simmer 1–2 minutes and turn off the heat.",
      "Garnish with fresh coriander and serve hot with naan, roti or rice.",
    ],
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    difficulty: "medium",
    imageUrl: "https://t3.ftcdn.net/jpg/06/01/41/68/360_F_601416862_AfYdeefqT1kGqWTx1DZCsJZVzYIDFzPR.jpg",
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
    imageUrl: "https://imgs.search.brave.com/WFNRhnLnIkUiD8Vx4JVmdvd3Nsexy9WynsbeVkzXigo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNDA4/MTk3NzAwL3N0b2Nr/LXBob3RvLWluZGlh/bi1wb3B1bGFyLWRy/aW5rLW1hc2FsYS1j/aGFpLW1hc2FsYS10/ZWEtdHJhZGl0aW9u/YWwtYmV2ZXJhZ2Ut/YmxhY2s",
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
    imageUrl: "https://imgs.search.brave.com/SZtEUHFubh58T-e_zX8TBsDD9UvtlNFFRnAAfjsiXyY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZhLzRm/LzZlLzZhNGY2ZTBj/M2M5MWJmYjdkMTA3/ZjE2NGU5NDg4YTNh/LmpwZw",
    createdAt: now,
    updatedAt: now,
  };

  const vegPulao = {
    id: generateId(),
    title: "Veg Pulao",
    description: "Aromatic one-pot vegetable pulao cooked with basmati rice and whole spices.",
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
    imageUrl: "https://imgs.search.brave.com/05qAKb-jz7L3bmIiuS6dTeeg7dxqCvuXuOk_HgfyOvw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVt/YWRzY2llbnRpc3Rz/a2l0Y2hlbi5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDQvUXVpY2stVmVn/LVB1bGFvLmpwZWc",
    createdAt: now,
    updatedAt: now,
  };

  const chickenBiryani = {
    id: generateId(),
    title: "Chicken Biryani",
    description: "Fragrant layered chicken biryani cooked with basmati rice and spices.",
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
    imageUrl: "https://imgs.search.brave.com/TgzxACdt-BK9X9Cgd3fAy7xTNA4MQZtQAHmK2Mp3pKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/NzEzLzYzNS9zbWFs/bC9mcmFncmFudC1m/bGF2b3JmdWwtY2hp/Y2tlbi1iaXJ5YW5p/LWNyb3duZWQtd2l0/aC1mcmllZC1vbmlv/bnMtZnJlZS1waG90/by5qcGc",
    createdAt: now,
    updatedAt: now,
  };

  const chickenMasala = {
    id: generateId(),
    title: "Chicken Masala",
    description: "Classic Chicken Masala — bold spices and onions cooked into a thick, flavorful gravy. Perfect with rice or rotis.",
    type: "nonveg",
    ingredients: [
      "500 g chicken, cut into pieces",
      "2 tbsp oil",
      "2 large onions, thinly sliced",
      "2 tomatoes, finely chopped or pureed",
      "2 tsp ginger-garlic paste",
      "2 tsp red chilli powder (adjust to taste)",
      "1 tsp turmeric powder",
      "2 tsp coriander powder",
      "1 tsp garam masala",
      "1/2 cup curd (optional)",
      "1 bay leaf",
      "2-3 green cardamoms",
      "4-5 cloves",
      "1 inch cinnamon stick",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    steps: [
      "Heat oil in a heavy-bottom pan. Add bay leaf, cardamom, cloves and cinnamon; sauté for 30 seconds.",
      "Add sliced onions and cook on medium-low heat until deep golden brown (8–10 minutes).",
      "Stir in ginger-garlic paste and sauté for 1–2 minutes until raw smell disappears.",
      "Add chopped/pureed tomatoes and cook until the oil separates from the masala (6–8 minutes).",
      "Add red chilli powder, turmeric, coriander powder and salt. Cook for 1–2 minutes.",
      "Add chicken pieces and mix well to coat with the masala. Cook for 5-6 minutes on medium heat.",
      "If using curd, whisk and add now; otherwise add 1/2 cup water, cover and simmer for 12–15 minutes until chicken is tender.",
      "Stir in garam masala, simmer 2 more minutes and turn off the heat.",
      "Garnish with fresh coriander and serve hot with rice, naan or roti.",
    ],
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    difficulty: "medium",
    imageUrl: "https://images.unsplash.com/photo-1604908176834-9157c5b8f4b3?auto=format&fit=crop&w=1200&q=80",
    createdAt: now,
    updatedAt: now,
  };

  return [
    butterChickenRecipe,
    simpleTea,
    quickSandwich,
    vegPulao,
    chickenBiryani,
    chickenMasala,
  ];
}
