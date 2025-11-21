<div align="center">

# 🍽️ Recipe Manager

**A modern, dark-themed recipe management app built with vanilla JavaScript**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![localStorage](https://img.shields.io/badge/Storage-localStorage-green?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

*Store, organize, and manage your favorite recipes with a sleek interface*

[View Demo](https://manav0721.github.io/Recipe_Manager/) 

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Data Structure](#-data-structure)
- [Usage](#-usage)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Browser Support](#-browser-support)
- [Assumptions & Limitations](#-assumptions--limitations)
- [Known Issues](#-known-issues)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Recipe Manager** is a lightweight, client-side web application for managing your recipe collection. Built with vanilla JavaScript and modern CSS, it offers a beautiful dark-themed interface with zero dependencies and instant performance.

### Why Recipe Manager?

- ✅ **Zero Setup** – Just open and use
- 🚀 **Lightning Fast** – No backend, no loading times
- 🎨 **Beautiful UI** – Modern dark theme with smooth animations
- 📱 **Fully Responsive** – Works on desktop, tablet, and mobile
- 🔒 **Private** – All data stays on your device

---

## ✨ Features

### Core Functionality
- ➕ **Add/Edit/Delete** recipes with rich details
- 🔍 **Instant Search** by title or description
- 🎚️ **Smart Filters** by difficulty (Easy/Medium/Hard)
- 🌿 **Type Toggle** for Veg/Non-Veg recipes
- 📸 **Image Support** via external URLs
- 💾 **Auto-Save** to localStorage

### User Experience
- ⌨️ **Keyboard Shortcuts** for power users
- 🎨 **Smooth Animations** and transitions
- 📊 **Result Counter** shows filtered recipes
- 🍞 **Toast Notifications** for actions
- 📱 **Mobile-Optimized** layout

### Pre-loaded Recipes
Comes with **6 delicious sample recipes**:
- 🥘 Paneer Tikka Masala
- ☕ Masala Chai
- 🥪 Veg Sandwich
- 🍚 Veg Pulao
- 🍗 Chicken Biryani
- 🍛 Butter Chicken

---

## 🚀 Quick Start

### Installation

1. **Download** or clone this repository:
   ```bash
   git clone https://github.com/yourusername/recipe-manager.git
   cd recipe-manager
   ```

2. **Open** `index.html` in your browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

3. **That's it!** No build process, no npm install, no configuration needed.

### File Structure

```
recipe-manager/
│
├── 📄 index.html          # Main HTML structure
├── 🎨 main.css            # Styling and dark theme
├── ⚙️ app.js              # Main application controller
├── 🖼️ ui.js               # UI rendering and DOM manipulation
├── 💾 storage.js          # localStorage management + seed data
└── ✅ validation.js       # Form validation logic
```

---

## 💾 Data Structure

All recipes are stored in **localStorage** under the key: `recipes_dark_app_v3_slider`

### Recipe Object Schema

```javascript
{
  id: "lq8z3f5g",              // Unique auto-generated ID
  title: "Paneer Tikka Masala",
  description: "Restaurant-style Paneer Tikka...",
  type: "veg",                 // "veg" | "nonveg"
  difficulty: "medium",        // "easy" | "medium" | "hard"

  ingredients: [               // Array of strings
    "250 g paneer, cubed",
    "1/2 cup thick yogurt"
  ],

  steps: [                     // Array of strings
    "Mix yogurt and spices...",
    "Marinate paneer for 15 mins..."
  ],

  prepTime: 30,                // Minutes (number)
  cookTime: 25,                // Minutes (number)
  totalTime: 55,               // Auto-calculated

  imageUrl: "https://...",     // External URL (optional)
  createdAt: "2025-11-21T09:20:23.825Z",
  updatedAt: "2025-11-21T09:20:23.825Z"
}
```

### Data Persistence

- Automatically saves to `localStorage` on every change
- Survives page refreshes and browser restarts
- **Warning**: Clearing browser data will delete all recipes
- No cloud backup – data is device-specific

---

## 🎮 Usage

### Adding a Recipe

1. Click the **"+ Add Recipe"** button (or press `^`)
2. Fill in all required fields:
   - Title and Description
   - Ingredients (one per line)
   - Steps (one per line)
   - Prep & Cook Time (in minutes)
   - Difficulty level
   - Veg/Non-Veg type
3. Optionally add an image URL
4. Click **"Save Recipe"**

### Searching & Filtering

- **Search Bar**: Type to filter by title/description
- **Difficulty Dropdown**: Filter by cooking difficulty
- **Type Slider**: Toggle between All/Veg/Non-Veg

### Viewing Recipe Details

Click any recipe card to see:
- Full ingredient list
- Step-by-step instructions
- Cooking times and difficulty
- Large preview image

### Editing & Deleting

- Click **"Edit"** button in detail view to modify recipe
- Click **"Delete"** button to remove (confirmation required)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `^` | Open "Add Recipe" form |
| `` ` `` (backtick) | Focus search bar |

---

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 90+ |
| Firefox | 88+ |
| Safari  | 14+ |
| Edge    | 90+ |

**Requirements**: ES6 modules support and localStorage enabled

---

## ⚙️ Assumptions & Limitations

### Assumptions

- Modern browser with **ES6 module** support
- **JavaScript enabled**
- Recipe images are **external URLs** (not file uploads)
- Ingredients/steps entered **one per line**
- Times measured in **minutes only**
- Single user per browser

### Limitations

| Limitation | Description |
|-----------|-------------|
| 🔒 **Local Only** | No cloud sync – data stored per browser |
| 👤 **Single User** | No authentication or multi-user support |
| 📸 **No Image Upload** | Only external URLs accepted |
| 💾 **Storage Cap** | ~5-10MB localStorage limit (browser-dependent) |
| 📤 **No Export** | Can't export recipes to file (CSV/JSON) |
| 🖨️ **No Print View** | No printer-friendly formatting |
| 🔄 **No Sync** | Data doesn't sync across devices |
| 📊 **No Analytics** | No usage tracking or statistics |

---

## 🐛 Known Issues

| Issue | Impact | Workaround |
|-------|--------|-----------|