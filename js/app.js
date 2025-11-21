// app.js - main orchestrator
import * as UI from "../ui.js";
import * as Storage from "../storage.js";
import * as Validation from "../validation.js";

const RecipeApp = (function () {
  let recipes = [];
  let currentRecipeId = null;

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // CRUD handlers
  function openDetailView(id) {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;
    currentRecipeId = id;
    UI.showDetail(recipe);
  }

  function openAddForm() {
    UI.clearForm();
    UI.setFormTitle("Add Recipe");
    UI.switchView("form");
    UI.showToast("Creating a new recipe…", "info");
  }

  function openEditForm(id) {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;
    UI.fillForm(recipe);
    UI.setFormTitle("Edit Recipe");
    UI.switchView("form");
  }

  function handleFormSubmit(e) {
    e && e.preventDefault && e.preventDefault();

    const formData = UI.readFormInputs();
    const { isValid, errors } = Validation.validateForm(formData);

    if (!isValid) {
      UI.showFormErrors(errors);
      UI.showToast("Please fix the form errors.", "error");
      return;
    }

    UI.hideFormErrors();

    const id = formData.id || generateId();
    const now = new Date().toISOString();

    const recipeData = {
      id,
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients,
      steps: formData.steps,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      totalTime: (formData.prepTime || 0) + (formData.cookTime || 0),
      difficulty: formData.difficulty,
      type: formData.type,
      imageUrl: formData.imageUrl,
      updatedAt: now,
    };

    const isEdit = !!formData.id;
    if (isEdit) {
      const idx = recipes.findIndex((r) => r.id === id);
      if (idx !== -1) {
        recipeData.createdAt = recipes[idx].createdAt || now;
        recipes[idx] = recipeData;
      }
      UI.showToast("Recipe updated.", "success");
    } else {
      recipeData.createdAt = now;
      recipes.push(recipeData);
      UI.showToast("Recipe added!", "success");
    }

    Storage.saveRecipes(recipes);
    UI.renderRecipeList(recipes);
    openDetailView(id);
  }

  function handleDeleteRecipe() {
    if (!currentRecipeId) return;
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    const title = recipe ? recipe.title : "this recipe";
    const ok = confirm(`Are you sure you want to delete "${title}"?`);
    if (!ok) return;
    recipes = recipes.filter((r) => r.id !== currentRecipeId);
    Storage.saveRecipes(recipes);
    currentRecipeId = null;
    UI.renderRecipeList(recipes);
    UI.switchView("list");
    UI.showToast("Recipe deleted.", "success");
  }

  // slider change handler used by UI
  function onTypeChange(value) {
    UI.updateTypeSlider(value);
    UI.renderRecipeList(recipes);
  }

  // search / filters
  function onSearchChange() {
    UI.renderRecipeList(recipes);
  }

  function onDifficultyChange() {
    UI.renderRecipeList(recipes);
  }

  // init wiring
  function init() {
    recipes = Storage.loadRecipes();
    // wire UI callbacks and initial render
    UI.init({
      onOpenAdd: openAddForm,
      onOpenEdit: (id) => openEditForm(id),
      onOpenDetail: (id) => openDetailView(id),
      onSubmitForm: handleFormSubmit,
      onDelete: handleDeleteRecipe,
      onTypeChange,
      onSearchChange,
      onDifficultyChange,
    });

    UI.renderRecipeList(recipes);
    UI.initTypeSlider();
    UI.showToast("Welcome to Recipe Manager!", "info");
  }

  return { init };
})();

// auto-init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  RecipeApp.init();
});
