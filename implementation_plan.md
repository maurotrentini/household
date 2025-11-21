# Implementation Plan - Household Manager PWA

# Goal Description
Create a Progressive Web App (PWA) to manage household activities. The app will use a **MERN stack** (MongoDB, Express, React, Node.js) to support the user's learning goals.
- **Family Schedule:**
    - Simple shared calendar events (Google Calendar style).
    - **Copy Week:** One-click action to duplicate all events from the previous week to the current one.
- **Meal Planner:** Recipe manager and automated shopping list, accessible via a single shared family login.

## User Review Required
> [!IMPORTANT]
> **Database:** We will use **MongoDB** as requested. For the easiest multi-device access (Phone + Desktop), I recommend using **MongoDB Atlas (Free Tier)** so you don't have to manage local network connections.
> **Auth:** Single shared email/password for the entire family.

## Proposed Changes
### Tech Stack
- **Frontend:** React (Vite) + TypeScript + TailwindCSS + `react-router-dom`
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB (via Mongoose ODM)
- **State Management:** React Context or TanStack Query (for easy server syncing)

### Data Model (MongoDB Schemas)
#### [NEW] `server/models/Recipe.ts`
- `title`: String
- `ingredients`: Array of Objects `{ name: String, quantity: String, unit: String }`
- `instructions`: String

#### [NEW] `server/models/MealPlan.ts`
- `date`: Date
- `recipe`: ObjectId (Ref to Recipe)
- `mealType`: String (Dinner, Lunch, etc.)

#### [NEW] `server/models/Event.ts`
- `title`: String
- `start`: Date
- `end`: Date
- `description`: String

### Features
- **Authentication:** Simple JWT-based auth with a shared "Family" account.
- **Calendar:** FullCalendar or custom grid to view/add Events.
- **Recipes:** CRUD interface for Recipes.
- **Shopping List:** Aggregation of ingredients from the MealPlan for a selected date range.

### Dockerization (New)
#### [NEW] `docker-compose.yml`
- Orchestrates Client, Server, and MongoDB services.
- Persists MongoDB data in a docker volume.

#### [NEW] `client/Dockerfile`
- Node.js base image.
- Installs dependencies.
- Exposes port 5173.

#### [NEW] `server/Dockerfile`
- Node.js base image.
- Installs dependencies.
- Exposes port 5000.

## Verification Plan
### Automated Tests
- Backend: Simple API tests using `supertest` or manual curl/Postman.
- Frontend: Browser testing.

### Manual Verification
- **Mobile:** Open app in Chrome on Android/Safari on iOS to verify PWA installability.
- **Desktop:** Verify responsive layout.
- **Flow:** Create a recipe -> Add to Meal Plan -> Check Shopping List.
