# Household Manager - Walkthrough

## Overview
The Household Manager is a PWA designed to help families manage their schedule, meals, and shopping.

## Features & Verification

### 1. Authentication
- **Register:** Go to `/register` to create a new family account.
- **Login:** Go to `/login` to access the app.
- **Logout:** Click "Logout" in the Navbar.

### 2. Recipes
- **View Recipes:** Navigate to "Recipes" to see the list.
- **Add Recipe:** Click "Add Recipe", enter Title, Ingredients (Name, Qty, Unit), and Instructions.
- **Add to Plan:** Click "Add to Meal Plan" on any recipe card and enter a date (YYYY-MM-DD).

### 3. Schedule
- **View Schedule:** Navigate to "Schedule" to see the weekly view.
- **Add Event:** Use the form at the bottom to add events (Title, Start, End).
- **Copy Week:** Click "Copy Previous Week" to duplicate events from the last week.

### 4. Shopping List
- **View List:** Navigate to "Shopping List".
- **Date Range:** Use the `<` and `>` buttons to navigate weeks.
- **Verification:** Ensure ingredients from recipes added to the Meal Plan appear here, aggregated by name and unit.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express, MongoDB
- **Auth:** JWT
- **DevOps:** Docker, Docker Compose

## Setup & Running
1. **Install Docker:** Ensure Docker Desktop is running.
2. **Start App:**
   ```bash
   docker-compose up --build
   ```
3. **Access:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`
   - MongoDB: `mongodb://localhost:27017` (exposed)

## 📱 PWA Installation

### Android (Chrome)
1. Open the app in Chrome.
2. Tap the **menu icon** (three dots) in the top right.
3. Tap **"Install App"** or **"Add to Home Screen"**.
4. Follow the prompts to install.

### iOS (Safari)
1. Open the app in Safari.
2. Tap the **Share button** (square with arrow up) at the bottom.
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **"Add"** in the top right corner.
