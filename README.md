📘 Recipe Manager — A Lightweight, Modern Recipe App

A fully client-side Recipe Manager Web App built using HTML, CSS, and Vanilla JavaScript.
The app allows users to add, edit, delete, search, and filter recipes, all stored locally using LocalStorage, making it fast, private, and completely offline-friendly.

🚀 Features
🥗 Core Features

Add new recipes with:

Title

Description

Ingredients

Steps

Preparation Time

Cooking Time

Difficulty

Veg/Non-Veg Type

Image URL

Edit existing recipes

Delete recipes

View recipes in a beautiful clean card layout

Detailed recipe view for reading instructions

Dark theme UI

🔍 Advanced Filtering & Search

Search by recipe title

Filter by difficulty (Easy / Medium / Hard)

Filter using Veg / Non-Veg / All slider

💾 Persistent Storage

Recipes are stored in the browser using LocalStorage

Includes pre-loaded sample recipes on first load

💡 User Experience Extras

Toast notifications

Accessible interactions

Responsive design for mobile & desktop

🏗️ Project Structure
root/
│── index.html       # Main HTML UI
│── main.css         # Complete styling + dark theme system
│── app.js           # Application logic + initialization
│── ui.js            # DOM rendering, event listeners, UI helpers
│── storage.js       # LocalStorage logic + seeded recipes
│── validation.js    # Form validation functions
└── assets/ (optional if you add images)

📁 File Responsibilities
index.html

Page layout

Recipe list section

Recipe detail modal

Recipe add/edit form

Search bar + filters

Dark UI structure

main.css

Complete UI styling

Responsive layout

Dark theme color variables

Card designs & animation

app.js

Main controller

Connects storage + UI + validation

Handles:

Adding recipes

Updating recipes

Viewing recipes

Deleting recipes

ui.js

Renders recipe cards

Renders detail screens

Handles veg/non-veg slider

Toast notifications

Switches between views (List / Form / Detail)

storage.js

Reads and writes recipes to LocalStorage

Seeds default data when none exists

Ensures persistence across sessions

validation.js

Validates title, description, ingredients, steps, times

Returns error objects for UI to display

🖼️ Screenshots (Add your images here)

You can replace these placeholders with real screenshots.

![Home Page](./screenshots/home.png)
![Add Recipe Page](./screenshots/add.png)
![Recipe Details](./screenshots/details.png)

🔧 Installation & Setup

You can run this project without any dependencies.

Option 1 — Open Directly

Simply open:

index.html


in any modern browser (Chrome, Edge, Firefox, Safari).

Option 2 — Recommended (Run a Local Server)

Using Python:

# Python 3
python -m http.server 8000


Then open:

http://localhost:8000


Why recommended?
Because it gives a real server environment and avoids browser restrictions.

📚 How to Use
➕ Add Recipe

Click Add Recipe button

Fill all required fields

Hit Save Recipe

The recipe gets saved in LocalStorage

✏️ Edit Recipe

Open a recipe

Click Edit

Modify fields

Save

🗑️ Delete Recipe

Open a recipe

Click Delete Recipe

Confirm

🔍 Search & Filter

Type in search bar to find recipes by title

Use difficulty dropdown

Use Veg/Non-Veg slider

🧠 LocalStorage Data

Recipes are stored under the key:

recipes_dark_app_v3_slider


This allows:

Persistent storage

Offline functionality

No backend required

You can manually inspect data in:

DevTools → Application → LocalStorage

🌱 Future Enhancements (Ideas)

Image upload instead of image URL

Export/import recipes as JSON

Categories (Breakfast, Lunch, Dinner)

Ratings & Favorites

Cloud sync with backend (optional upgrade)