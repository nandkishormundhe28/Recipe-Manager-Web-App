# 🍽️ Recipe Manager

**A modern, dark-themed recipe management app built with vanilla JavaScript**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![localStorage](https://img.shields.io/badge/Storage-localStorage-green?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🚀 Features

- Add, edit, and delete recipes  
- Detailed view with ingredients, steps, and time breakdown  
- Live search  
- Filter by difficulty  
- Veg / Non-veg filter  
- Responsive grid layout  
- LocalStorage persistence  
- Smooth UI animations  
- Clean dark theme  
- Toast notifications  

---

## 📁 Project Structure

<<<<<<< HEAD

├── index.html

├── main.css

├── app.js

├── ui.js

├── storage.js

└── validation.js
>>>>>>> c3c4b5075aecd4b150c00f6c089dd684fa421e5b

---

## ▶️ How to Run the App

The app is **fully frontend** and requires no backend or installation.

### ✅ Option 1 — Open Directly  
Just double-click:

index.html

yaml
Copy code

The app runs instantly in any modern browser.

Website Link - https://nandkishormundhe28.github.io/Recipe-Manager-Web-App/

---

### ✅ Option 2 — Run with Live Server (Recommended)

If using VS Code:

1. Install **Live Server** extension  
2. Right-click **index.html**  
3. Select **Open with Live Server**

This avoids caching issues and enables smooth development.

---

### ✅ Option 3 — Deploy on GitHub Pages

1. Push your project to GitHub  
2. Go to:  
   **Settings → Pages**  
3. Select:  
   - Branch: `main`  
   - Folder: `/ (root)`  
4. Save settings  

Your site will go live in 30–60 seconds.

---

## 🗂️ Data Structure in LocalStorage

Your app uses a single LocalStorage key:

recipes_dark_app_v3_slider

kotlin
Copy code

It stores an **array of recipe objects**, each following this structure:

```json
{
  "id": "unique-id",
  "title": "Butter Chicken",
  "description": "Creamy chicken dish…",
  "ingredients": ["500 g chicken", "1/2 cup curd", "..."],
  "steps": ["Marinate chicken", "Cook gravy", "..."],
  "prepTime": 20,
  "cookTime": 30,
  "totalTime": 50,
  "difficulty": "medium",
  "type": "nonveg",
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2024-02-10T08:30:00Z",
  "updatedAt": "2024-02-10T08:35:00Z"
}
The entire LocalStorage entry looks like:

json
Copy code
[
  { "id": "r1", ... },
  { "id": "r2", ... }
]
This structure is implemented in storage.js.

🧠 App Architecture
Your application uses a modular setup:

📌 app.js — Main Controller
Handles navigation between views

Add/Edit/Delete logic

Integrates UI + Storage + Validation

Main initialization point

📌 ui.js — Handles All DOM & Rendering
Renders recipe cards

Renders recipe detail view

Updates grid

Switches between views

Shows toasts

Handles search, slider, difficulty filters

📌 storage.js — Data Management
Saves recipes to LocalStorage

Loads recipes

Deletes recipes

Generates new IDs

Inserts seed recipes if none exist

📌 validation.js — Form Validation
Ensures required fields & values are correct:

Title

Description

Ingredients

Steps

Prep/Cook times

Difficulty

Type (Veg/Non-veg)

✔️ Assumptions
User has JavaScript enabled

Browser supports ES6 modules

LocalStorage is available (not disabled)

URLs used in image fields are valid external images

The user will interact using desktop or mobile browsers

⚠️ Limitations
LocalStorage size limit (~5MB)

Data cannot sync across devices

No drag-and-drop image upload

No backend API

Image URLs may break if hosting changes

Not designed for very large recipe lists (hundreds+)

🐞 Known Issues
1. Edit Button Not Visible
Occurs if the detail-page HTML does not include:

html
Copy code
<button id="editRecipeBtn">Edit</button>
<<<<<<< HEAD
(UI logic expects this element.)
=======
(UI logic expects this element.)
>>>>>>> c3c4b5075aecd4b150c00f6c089dd684fa421e5b
