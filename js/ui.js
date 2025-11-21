// ui.js - all DOM rendering, slider, toasts

// Views
const views = {
  list: document.getElementById("recipe-list-view"),
  detail: document.getElementById("recipe-detail-view"),
  form: document.getElementById("recipe-form-view"),
};

// List
const recipeGrid = document.getElementById("recipeGrid");
const emptyState = document.getElementById("emptyState");
const resultInfo = document.getElementById("resultInfo");

// Detail DOM
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailImage = document.getElementById("detailImage");
const detailDifficultyBadge = document.getElementById("detailDifficultyBadge");
const detailTypeBadge = document.getElementById("detailTypeBadge");
const detailPrepTime = document.getElementById("detailPrepTime");
const detailCookTime = document.getElementById("detailCookTime");
const detailTotalTime = document.getElementById("detailTotalTime");
const detailTypeText = document.getElementById("detailTypeText");
const detailIngredients = document.getElementById("detailIngredients");
const detailSteps = document.getElementById("detailSteps");

// Form error box
const formErrors = document.getElementById("formErrors");

// Toast + slider
const toastContainer = document.getElementById("toastContainer");
const typeSlider = document.getElementById("typeSlider");
const typeFilter = document.getElementById("typeFilter");
let typeSliderOptions = null;
let typeSliderThumb = null;

/* ========== Helpers ========== */
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ========== View helpers ========== */
export function switchView(viewName) {
  Object.values(views).forEach((v) => v.classList.remove("active"));
  views[viewName].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ========== Toasts ========== */
export function showToast(message, type = "info") {
  if (!toastContainer) return;

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

/* ========== Form errors ========== */
export function showFormErrorsUI(errors) {
  if (!errors || !errors.length) {
    hideFormErrorsUI();
    return;
  }
  formErrors.innerHTML =
    "<strong>Please fix the following:</strong>" +
    "<ul>" +
    errors.map((e) => `<li>${e}</li>`).join("") +
    "</ul>";
  formErrors.classList.remove("hidden");
}

export function hideFormErrorsUI() {
  formErrors.classList.add("hidden");
  formErrors.innerHTML = "";
}

/* ========== List rendering ========== */
export function renderRecipeList(recipes, filters, onCardClick) {
  const { search, difficulty, type } = filters;

  let filtered = recipes.slice();

  if (search) {
    filtered = filtered.filter((r) =>
      r.title.toLowerCase().includes(search)
    );
  }

  if (difficulty !== "all") {
    filtered = filtered.filter((r) => r.difficulty === difficulty);
  }

  if (type !== "all") {
    filtered = filtered.filter((r) => (r.type || "veg") === type);
  }

  recipeGrid.innerHTML = "";

  if (!filtered.length) {
    emptyState.classList.remove("hidden");
    if (resultInfo) resultInfo.textContent = "";
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  if (resultInfo) {
    resultInfo.textContent = `Showing ${filtered.length} recipe(s)`;
  }

  filtered.forEach((recipe, index) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;

    // subtle entrance animation
    card.style.animation = `fadeInUp 0.3s ease-out ${index * 0.04}s both`;

    const difficultyBadge = `<span class="badge ${recipe.difficulty}">${capitalize(
      recipe.difficulty
    )}</span>`;
    const totalTime = recipe.totalTime || recipe.prepTime + recipe.cookTime;

    const safeTitle = escapeHTML(recipe.title);
    const imgSrc =
      recipe.imageUrl && recipe.imageUrl.trim()
        ? escapeHTML(recipe.imageUrl.trim())
        : "";

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
          ${
            recipe.description && recipe.description.length > 120
              ? "..."
              : ""
          }
        </p>
        <div class="recipe-card-meta">
          ${difficultyBadge}
          ${typePill}
          <span>⏱ ${totalTime} mins</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => onCardClick(recipe.id));
    recipeGrid.appendChild(card);
  });
}

/* ========== Detail rendering ========== */
export function showRecipeDetail(recipe) {
  detailTitle.textContent = recipe.title;
  detailDescription.textContent = recipe.description || "";

  // difficulty badge
  const difficultyLabel = capitalize(recipe.difficulty);
  detailDifficultyBadge.textContent = difficultyLabel;
  detailDifficultyBadge.classList.remove("easy", "medium", "hard");
  detailDifficultyBadge.classList.add(recipe.difficulty);

  // type badge
  const typeLabel = recipe.type === "nonveg" ? "Non-veg" : "Veg";
  const typeClass = recipe.type === "nonveg" ? "nonveg" : "veg";
  detailTypeBadge.textContent = typeLabel;
  detailTypeBadge.className = `type-pill ${typeClass}`;
  detailTypeText.textContent = typeLabel;

  // image
  if (recipe.imageUrl) {
    detailImage.src = recipe.imageUrl;
    detailImage.classList.remove("hidden");
  } else {
    detailImage.classList.add("hidden");
  }

  detailPrepTime.textContent = recipe.prepTime || 0;
  detailCookTime.textContent = recipe.cookTime || 0;
  detailTotalTime.textContent =
    recipe.totalTime || recipe.prepTime + recipe.cookTime;

  // ingredients
  detailIngredients.innerHTML = "";
  (recipe.ingredients || []).forEach((ing) => {
    const li = document.createElement("li");
    li.textContent = ing;
    detailIngredients.appendChild(li);
  });

  // steps
  detailSteps.innerHTML = "";
  (recipe.steps || []).forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    detailSteps.appendChild(li);
  });

  switchView("detail");
}

/* ========== Veg / Non-veg slider ========== */
export function initTypeSlider(onChange) {
  if (!typeSlider) return;

  typeSliderOptions = typeSlider.querySelectorAll(".type-slider-option");
  typeSliderThumb = typeSlider.querySelector(".type-slider-thumb");

  typeSliderOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value; // "all" | "veg" | "nonveg"
      typeFilter.value = value; // sync hidden select
      updateTypeSlider(value);
      onChange(value);
    });
  });

  // initial state
  updateTypeSlider(typeFilter.value || "all");
}

function updateTypeSlider(value) {
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

export function getTypeFilterValue() {
  return typeFilter.value || "all";
}