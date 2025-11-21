// app.js - main controller (modular version)

import { loadRecipes, saveRecipes, generateId } from "./storage.js";
import { validateRecipeForm } from "./validation.js";
import {
  renderRecipeList,
  showRecipeDetail,
  showFormErrorsUI,
  hideFormErrorsUI,
  showToast,
  initTypeSlider,
  getTypeFilterValue,
  switchView,
} from "./ui.js";

let recipes = [];
let currentRecipeId = null;

/* ===== DOM (form & filters) ===== */
const addRecipeBtn = document.getElementById("addRecipeBtn");
const backToListFromDetail = document.getElementById("backToListFromDetail");
const backToListFromForm = document.getElementById("backToListFromForm");
const cancelFormBtn = document.getElementById("cancelFormBtn");

const searchInput = document.getElementById("searchInput");
const difficultyFilter = document.getElementById("difficultyFilter");

const recipeForm = document.getElementById("recipeForm");
const formTitle = document.getElementById("formTitle");
const recipeIdInput = document.getElementById("recipeId");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const ingredientsInput = document.getElementById("ingredients");
const stepsInput = document.getElementById("steps");
const prepTimeInput = document.getElementById("prepTime");
const cookTimeInput = document.getElementById("cookTime");
const difficultyInput = document.getElementById("difficulty");
const recipeTypeInput = document.getElementById("recipeType");
const imageUrlInput = document.getElementById("imageUrl");

const editRecipeBtn = document.getElementById("editRecipeBtn");
const deleteRecipeBtn = document.getElementById("deleteRecipeBtn");

/* ===== Helpers ===== */
function getFilters() {
  return {
    search: searchInput.value.trim().toLowerCase(),
    difficulty: difficultyFilter.value,
    type: getTypeFilterValue(),
  };
}

function refreshList() {
  renderRecipeList(recipes, getFilters(), openDetailView);
}

function clearForm() {
  recipeIdInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  ingredientsInput.value = "";
  stepsInput.value = "";
  prepTimeInput.value = "";
  cookTimeInput.value = "";
  difficultyInput.value = "";
  recipeTypeInput.value = "";
  imageUrlInput.value = "";
  hideFormErrorsUI();
}

/* ===== Detail / Form open ===== */
function openDetailView(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;
  currentRecipeId = id;
  showRecipeDetail(recipe);
}

function openAddForm() {
  clearForm();
  formTitle.textContent = "Add Recipe";
  switchView("form");
  showToast("Creating a new recipe…", "info");
}

function openEditForm(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;

  clearForm();
  formTitle.textContent = "Edit Recipe";
  recipeIdInput.value = recipe.id;
  titleInput.value = recipe.title || "";
  descriptionInput.value = recipe.description || "";
  ingredientsInput.value = (recipe.ingredients || []).join("\n");
  stepsInput.value = (recipe.steps || []).join("\n");
  prepTimeInput.value = recipe.prepTime ?? "";
  cookTimeInput.value = recipe.cookTime ?? "";
  difficultyInput.value = recipe.difficulty || "";
  recipeTypeInput.value = recipe.type || "veg";
  imageUrlInput.value = recipe.imageUrl || "";

  switchView("form");
}

/* ===== Form submit ===== */
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    title: titleInput.value,
    description: descriptionInput.value,
    ingredientsRaw: ingredientsInput.value,
    stepsRaw: stepsInput.value,
    prepTime: prepTimeInput.value.trim(),
    cookTime: cookTimeInput.value.trim(),
    difficulty: difficultyInput.value,
    type: recipeTypeInput.value,
  };

  const { isValid, errors } = validateRecipeForm(formData);
  if (!isValid) {
    showFormErrorsUI(errors);
    showToast("Please fix the form errors.", "error");
    return;
  }

  hideFormErrorsUI();

  const id = recipeIdInput.value || generateId();
  const isEdit = Boolean(recipeIdInput.value);

  const ingredients = ingredientsInput.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const steps = stepsInput.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const prepNum = Number(prepTimeInput.value.trim());
  const cookNum = Number(cookTimeInput.value.trim());
  const now = new Date().toISOString();

  const recipeData = {
    id,
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    ingredients,
    steps,
    prepTime: prepNum,
    cookTime: cookNum,
    totalTime: prepNum + cookNum,
    difficulty: difficultyInput.value,
    type: recipeTypeInput.value,
    imageUrl: imageUrlInput.value.trim(),
    updatedAt: now,
  };

  if (isEdit) {
    const index = recipes.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipeData.createdAt = recipes[index].createdAt || now;
      recipes[index] = recipeData;
    }
    showToast("Recipe updated.", "success");
  } else {
    recipeData.createdAt = now;
    recipes.push(recipeData);
    showToast("Recipe added!", "success");
  }

  saveRecipes(recipes);
  refreshList();
  openDetailView(id);
}

/* ===== Delete ===== */
function handleDeleteRecipe() {
  if (!currentRecipeId) return;
  const recipe = recipes.find((r) => r.id === currentRecipeId);
  const title = recipe ? recipe.title : "this recipe";

  const ok = confirm(`Are you sure you want to delete "${title}"?`);
  if (!ok) return;

  recipes = recipes.filter((r) => r.id !== currentRecipeId);
  saveRecipes(recipes);
  currentRecipeId = null;
  refreshList();
  switchView("list");
  showToast("Recipe deleted.", "success");
}

/* ===== Event wiring ===== */
function initEvents() {
  addRecipeBtn.addEventListener("click", openAddForm);

  backToListFromDetail.addEventListener("click", () => switchView("list"));
  backToListFromForm.addEventListener("click", () => switchView("list"));
  cancelFormBtn.addEventListener("click", () => switchView("list"));

  searchInput.addEventListener("input", refreshList);
  difficultyFilter.addEventListener("change", refreshList);

  recipeForm.addEventListener("submit", handleFormSubmit);
  editRecipeBtn.addEventListener("click", () => {
    if (currentRecipeId) openEditForm(currentRecipeId);
  });
  deleteRecipeBtn.addEventListener("click", handleDeleteRecipe);

  // keyboard shortcuts (^ to add, ` to search)
  document.addEventListener("keydown", (e) => {
    if (e.key === "^") {
      e.preventDefault();
      openAddForm();
    } else if (e.key === "`" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/* ===== Init ===== */
function init() {
  recipes = loadRecipes();
  initEvents();
  initTypeSlider(() => refreshList());
  refreshList();
  showToast("Welcome to Recipe Manager!", "info");
  switchView("list");
}

// Since script is type="module" and loaded at the end of <body>, this is safe:
document.addEventListener("DOMContentLoaded", init);