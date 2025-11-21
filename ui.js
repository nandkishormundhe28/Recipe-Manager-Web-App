// ui.js - DOM interactions, rendering & helpers
import * as Storage from "./storage.js"; // used only if UI needs seeds in future

// Robust DOM query helper (keeps your original resilient lookups)
function findFirst(...candidates) {
  for (const c of candidates) {
    if (!c) continue;
    const byId = document.getElementById(c);
    if (byId) return byId;
    if (c[0] === "." || c[0] === "#") {
      const q = document.querySelector(c);
      if (q) return q;
    }
    const q1 =
      document.querySelector(`[data-role="${c}"]`) ||
      document.querySelector(`[data-action="${c}"]`) ||
      document.querySelector(`[data-id="${c}"]`);
    if (q1) return q1;
    try {
      const q2 = document.querySelector(c);
      if (q2) return q2;
    } catch (e) {
      // ignore invalid selector
    }
  }
  return null;
}

/* ====== DOM ELEMENTS (same names used in original file) ====== */
const views = {
  list: findFirst("recipe-list-view", "list", "recipe-list", "recipeListView", "#list-view", "#recipe-list-view", "#grid"),
  detail: findFirst("recipe-detail-view", "detail", "recipe-detail", "#detail", "#recipe-detail-view"),
  form: findFirst("recipe-form-view", "form", "recipe-form", "#formSection", "#recipe-form-view"),
};

const recipeGrid = findFirst("recipeGrid", "grid", "recipe-grid", "#recipeGrid", ".recipe-grid");
const emptyState = findFirst("emptyState", "empty-state", ".empty-state", "#emptyState");
const resultInfo = findFirst("resultInfo", "result-info", ".result-info", "#resultInfo");

const addRecipeBtn = findFirst("addRecipeBtn", "openForm", "fab", "add-recipe", '[data-action="add-recipe"]', "#addRecipeBtn", "#openForm", "#fab");
const backToListFromDetail = findFirst("backToListFromDetail", "backToList", "back-detail", "#backToListFromDetail");
const backToListFromForm = findFirst("backToListFromForm", "backToForm", "back-form", "#backToListFromForm");
const cancelFormBtn = findFirst("cancelFormBtn", "cancelForm", "cancelBtn", "#cancelFormBtn");

const searchInput = findFirst("searchInput", "search", "#searchInput", ".search-input");
const difficultyFilter = findFirst("difficultyFilter", "#difficultyFilter", ".difficulty-filter");
const typeFilter = findFirst("typeFilter", "#typeFilter", ".type-filter"); // hidden fallback

// detail elements
const detailTitle = findFirst("detailTitle", "detail-title", "#detailTitle");
const detailDescription = findFirst("detailDescription", "detail-description", "#detailDescription");
const detailImage = findFirst("detailImage", "detail-image", "#detailImage");
const detailDifficultyBadge = findFirst("detailDifficultyBadge", "detail-difficulty-badge", "#detailDifficultyBadge");
const detailTypeBadge = findFirst("detailTypeBadge", "detail-type-badge", "#detailTypeBadge");
const detailPrepTime = findFirst("detailPrepTime", "detail-prep-time", "#detailPrepTime");
const detailCookTime = findFirst("detailCookTime", "detail-cook-time", "#detailCookTime");
const detailTotalTime = findFirst("detailTotalTime", "detail-total-time", "#detailTotalTime");
const detailTypeText = findFirst("detailTypeText", "detail-type-text", "#detailTypeText");
const detailIngredients = findFirst("detailIngredients", "detail-ingredients", "#detailIngredients");
const detailSteps = findFirst("detailSteps", "detail-steps", "#detailSteps");
const editRecipeBtn = findFirst("editRecipeBtn", "editRecipe", "#editRecipeBtn");
const deleteRecipeBtn = findFirst("deleteRecipeBtn", "deleteRecipe", "#deleteRecipeBtn");

// form
const recipeForm = findFirst("recipeForm", "#recipeForm", ".recipe-form", "#form");
const formTitle = findFirst("formTitle", "formTitle", "#formTitle");
const formErrors = findFirst("formErrors", "#formErrors", ".form-errors");

const recipeIdInput = findFirst("recipeId", "#recipeId", "recipeId");
const titleInput = findFirst("title", "#title", ".title");
const descriptionInput = findFirst("description", "#description", ".description");
const ingredientsInput = findFirst("ingredients", "#ingredients", ".ingredients");
const stepsInput = findFirst("steps", "#steps", ".steps");
const prepTimeInput = findFirst("prepTime", "#prepTime");
const cookTimeInput = findFirst("cookTime", "#cookTime");
const difficultyInput = findFirst("difficulty", "#difficulty");
const recipeTypeInput = findFirst("recipeType", "#recipeType");
const imageUrlInput = findFirst("imageUrl", "#imageUrl");

// toasts & slider
const toastContainer = findFirst("toastContainer", "toasts", "toastsContainer", "#toastContainer", "#toasts");
const typeSlider = findFirst("typeSlider", "type-slider", "#typeSlider");
let typeSliderOptions = null;
let typeSliderThumb = null;

// small helpers
function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function capitalize(str) { if (!str) return ""; return str.charAt(0).toUpperCase() + str.slice(1); }

let callbacks = {};

export function init(cbs = {}) {
  callbacks = cbs;
  initEvents();
}

export function setFormTitle(txt) {
  if (formTitle) formTitle.textContent = txt || "";
}

export function clearForm() {
  if (recipeIdInput) recipeIdInput.value = "";
  if (titleInput) titleInput.value = "";
  if (descriptionInput) descriptionInput.value = "";
  if (ingredientsInput) ingredientsInput.value = "";
  if (stepsInput) stepsInput.value = "";
  if (prepTimeInput) prepTimeInput.value = "";
  if (cookTimeInput) cookTimeInput.value = "";
  if (difficultyInput) difficultyInput.value = "";
  if (recipeTypeInput) recipeTypeInput.value = "";
  if (imageUrlInput) imageUrlInput.value = "";
  hideFormErrors();
}

export function readFormInputs() {
  return {
    id: recipeIdInput ? recipeIdInput.value.trim() : "",
    title: titleInput ? titleInput.value.trim() : "",
    description: descriptionInput ? descriptionInput.value.trim() : "",
    ingredients: ingredientsInput ? ingredientsInput.value.split("\n").map(s => s.trim()).filter(Boolean) : [],
    steps: stepsInput ? stepsInput.value.split("\n").map(s => s.trim()).filter(Boolean) : [],
    prepTime: prepTimeInput ? Number(prepTimeInput.value.trim()) || 0 : 0,
    cookTime: cookTimeInput ? Number(cookTimeInput.value.trim()) || 0 : 0,
    difficulty: difficultyInput ? difficultyInput.value : "",
    type: recipeTypeInput ? recipeTypeInput.value : "veg",
    imageUrl: imageUrlInput ? imageUrlInput.value.trim() : "",
  };
}

export function fillForm(recipe) {
  if (!recipe) return;
  if (recipeIdInput) recipeIdInput.value = recipe.id || "";
  if (titleInput) titleInput.value = recipe.title || "";
  if (descriptionInput) descriptionInput.value = recipe.description || "";
  if (ingredientsInput) ingredientsInput.value = (recipe.ingredients || []).join("\n");
  if (stepsInput) stepsInput.value = (recipe.steps || []).join("\n");
  if (prepTimeInput) prepTimeInput.value = recipe.prepTime ?? "";
  if (cookTimeInput) cookTimeInput.value = recipe.cookTime ?? "";
  if (difficultyInput) difficultyInput.value = recipe.difficulty || "";
  if (recipeTypeInput) recipeTypeInput.value = recipe.type || "veg";
  if (imageUrlInput) imageUrlInput.value = recipe.imageUrl || "";
}

export function switchView(viewName) {
  if (!views || !views.list || !views.detail || !views.form) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const fallback = findFirst(viewName === "list" ? "#recipe-list-view" : null, `#${viewName}`);
    if (fallback) fallback.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  Object.values(views).forEach((v) => v && v.classList.remove("active"));
  const target = views[viewName];
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function showDetail(recipe) {
  if (detailTitle) detailTitle.textContent = recipe.title || "";
  if (detailDescription) detailDescription.textContent = recipe.description || "";

  if (detailDifficultyBadge) {
    detailDifficultyBadge.textContent = capitalize(recipe.difficulty);
    detailDifficultyBadge.classList.remove("easy", "medium", "hard");
    if (recipe.difficulty) detailDifficultyBadge.classList.add(recipe.difficulty);
  }

  const typeLabel = recipe.type === "nonveg" ? "Non-veg" : "Veg";
  const typeClass = recipe.type === "nonveg" ? "nonveg" : "veg";
  if (detailTypeBadge) {
    detailTypeBadge.textContent = typeLabel;
    detailTypeBadge.className = `type-pill ${typeClass}`;
  }
  if (detailTypeText) detailTypeText.textContent = typeLabel;

  if (detailImage) {
    if (recipe.imageUrl) {
      detailImage.src = recipe.imageUrl;
      detailImage.classList.remove("hidden");
    } else {
      detailImage.classList.add("hidden");
    }
  }

  if (detailPrepTime) detailPrepTime.textContent = recipe.prepTime || 0;
  if (detailCookTime) detailCookTime.textContent = recipe.cookTime || 0;
  if (detailTotalTime) detailTotalTime.textContent = recipe.totalTime || (recipe.prepTime || 0) + (recipe.cookTime || 0);

  if (detailIngredients) {
    detailIngredients.innerHTML = "";
    (recipe.ingredients || []).forEach((ing) => {
      const li = document.createElement("li");
      li.textContent = ing;
      detailIngredients.appendChild(li);
    });
  }

  if (detailSteps) {
    detailSteps.innerHTML = "";
    (recipe.steps || []).forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      detailSteps.appendChild(li);
    });
  }

  switchView("detail");
}

export function renderRecipeList(recipes) {
  const query = (searchInput && searchInput.value ? searchInput.value.trim().toLowerCase() : "");
  const diff = difficultyFilter ? difficultyFilter.value : "all";
  const type = typeFilter ? typeFilter.value : "all";

  let filtered = recipes.slice();

  if (query) {
    filtered = filtered.filter((r) => (r.title || "").toLowerCase().includes(query));
  }

  if (diff !== "all") {
    filtered = filtered.filter((r) => r.difficulty === diff);
  }

  if (type !== "all") {
    filtered = filtered.filter((r) => (r.type || "veg") === type);
  }

  if (!recipeGrid) {
    console.warn("Recipe grid element not found. Skipping render.");
    return;
  }

  recipeGrid.innerHTML = "";

  if (!filtered.length) {
    if (emptyState) emptyState.classList.remove("hidden");
    if (resultInfo) resultInfo.textContent = "";
    return;
  } else {
    if (emptyState) emptyState.classList.add("hidden");
  }

  if (resultInfo) {
    resultInfo.textContent = `Showing ${filtered.length} recipe(s)`;
  }

  filtered.forEach((recipe, index) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;
    card.style.animation = `fadeInUp 0.3s ease-out ${index * 0.04}s both`;

    const difficultyBadge = `<span class="badge ${recipe.difficulty}">${capitalize(recipe.difficulty)}</span>`;
    const totalTime = recipe.totalTime || (recipe.prepTime || 0) + (recipe.cookTime || 0);
    const safeTitle = escapeHTML(recipe.title || "Recipe");
    const imgSrc = recipe.imageUrl && recipe.imageUrl.trim() ? escapeHTML(recipe.imageUrl.trim()) : "";

    const thumbHTML = imgSrc
      ? `
        <div class="recipe-card-thumb">
          <img src="${imgSrc}" alt="${safeTitle}" loading="lazy" />
        </div>
      `
      : `
        <div class="recipe-card-thumb placeholder">
          <span>${safeTitle.charAt(0) || "R"}</span>
        </div>
      `;

    const typeLabel = recipe.type === "nonveg" ? "Non-veg" : "Veg";
    const typeClass = recipe.type === "nonveg" ? "nonveg" : "veg";
    const typePill = `<span class="type-pill ${typeClass}">${typeLabel}</span>`;

    card.innerHTML = `
      ${thumbHTML}
      <div class="recipe-card-content">
        <h2 class="recipe-card-title">${safeTitle}</h2>
        <p class="recipe-card-desc">
          ${escapeHTML(recipe.description || "").slice(0, 120)}
          ${recipe.description && recipe.description.length > 120 ? "..." : ""}
        </p>
        <div class="recipe-card-meta">
          ${difficultyBadge}
          ${typePill}
          <span>⏱ ${totalTime} mins</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (callbacks.onOpenDetail) callbacks.onOpenDetail(recipe.id);
    });
    recipeGrid.appendChild(card);
  });
}

export function showFormErrors(errors) {
  if (!formErrors) return;
  if (!errors || !errors.length) {
    hideFormErrors();
    return;
  }
  formErrors.innerHTML =
    "<strong>Please fix the following:</strong>" +
    "<ul>" +
    errors.map((e) => `<li>${escapeHTML(e)}</li>`).join("") +
    "</ul>";
  formErrors.classList.remove("hidden");
}

export function hideFormErrors() {
  if (!formErrors) return;
  formErrors.classList.add("hidden");
  formErrors.innerHTML = "";
}

export function showToast(message, type = "info") {
  if (!toastContainer) {
    console.info("Toast:", message);
    return;
  }
  const toast = document.createElement("div");
  toast.className = "toast";

  const iconSpan = document.createElement("span");
  iconSpan.className = "icon";

  if (type === "success") iconSpan.textContent = "✅";
  else if (type === "error") iconSpan.textContent = "⚠️";
  else iconSpan.textContent = "ℹ️";

  const textSpan = document.createElement("span");
  textSpan.textContent = message;

  toast.appendChild(iconSpan);
  toast.appendChild(textSpan);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

/* ===== Type slider (veg/nonveg toggle) ===== */
export function initTypeSlider() {
  if (!typeSlider) return;
  typeSliderOptions = Array.from(typeSlider.querySelectorAll(".type-slider-option"));
  typeSliderThumb = typeSlider.querySelector(".type-slider-thumb");
  if (!typeSliderOptions.length || !typeSliderThumb) return;

  typeSliderOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value;
      if (typeFilter) typeFilter.value = value;
      updateTypeSlider(value);
      if (callbacks.onTypeChange) callbacks.onTypeChange(value);
    });
  });

  // initial sync
  updateTypeSlider(typeFilter ? typeFilter.value : "all");
}

export function updateTypeSlider(value) {
  if (!typeSliderOptions || !typeSliderThumb) return;
  const indexMap = { all: 0, veg: 1, nonveg: 2 };
  const idx = indexMap[value] ?? 0;
  typeSliderThumb.style.transform = `translateX(${idx * 100}%)`;
  typeSliderOptions.forEach((btn) => {
    const isActive = btn.dataset.value === value;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

/* ===== events wiring ===== */
function initEvents() {
  if (addRecipeBtn) addRecipeBtn.addEventListener("click", () => callbacks.onOpenAdd && callbacks.onOpenAdd());
  else {
    const fallbackAdd = document.querySelector('[data-action="add-recipe"]');
    if (fallbackAdd) fallbackAdd.addEventListener("click", () => callbacks.onOpenAdd && callbacks.onOpenAdd());
    else console.warn("Add-recipe button not found (tried several IDs).");
  }

  if (backToListFromDetail) backToListFromDetail.addEventListener("click", () => switchView("list"));
  if (backToListFromForm) backToListFromForm.addEventListener("click", () => switchView("list"));
  if (cancelFormBtn) cancelFormBtn.addEventListener("click", () => switchView("list"));

  if (searchInput) searchInput.addEventListener("input", () => callbacks.onSearchChange && callbacks.onSearchChange());
  if (difficultyFilter) difficultyFilter.addEventListener("change", () => callbacks.onDifficultyChange && callbacks.onDifficultyChange());

  if (typeFilter) {
    typeFilter.addEventListener("change", () => {
      updateTypeSlider(typeFilter.value);
      callbacks.onTypeChange && callbacks.onTypeChange(typeFilter.value);
    });
  }

  if (recipeForm) recipeForm.addEventListener("submit", (e) => callbacks.onSubmitForm && callbacks.onSubmitForm(e));
  if (editRecipeBtn) editRecipeBtn.addEventListener("click", () => {
    const id = (document.querySelector("[data-id]") && document.querySelector("[data-id]").dataset.id) || null;
    // prefer current detail state; we keep edit callback external
    if (callbacks.onOpenEdit) {
      // try to get current id from detail view dataset if set
      const datasetId = editRecipeBtn.dataset.id || null;
      callbacks.onOpenEdit(datasetId || null);
    }
  });
  if (deleteRecipeBtn) deleteRecipeBtn.addEventListener("click", () => callbacks.onDelete && callbacks.onDelete());

  // keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "n" || e.key === "1") {
      e.preventDefault();
      callbacks.onOpenAdd && callbacks.onOpenAdd();
    } else if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
}
