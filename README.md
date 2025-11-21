# Household Manager

A Progressive Web App (PWA) designed to help families manage their schedule, meals, and shopping. Built with the MERN stack (MongoDB, Express, React, Node.js) and fully containerized with Docker.

## 🚀 Quick Start (Docker)

The easiest way to run the application is using Docker. This will spin up the Client, Server, and MongoDB database without any local installation required.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Running the App

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:maurotrentini/household.git
    cd household
    ```

2.  **Start the application:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    - **Frontend:** [http://localhost:5173](http://localhost:5173)
    - **Backend API:** [http://localhost:5000](http://localhost:5000)
    - **MongoDB:** `mongodb://localhost:27017`

4.  **Stop the application:**
    Press `Ctrl+C` in the terminal or run:
    ```bash
    docker-compose down
    ```

## 🛠 Tech Stack

-   **Frontend:** React, Vite, TypeScript, TailwindCSS
-   **Backend:** Node.js, Express, TypeScript
-   **Database:** MongoDB
-   **DevOps:** Docker, Docker Compose

## ✨ Features

-   **Authentication:** Shared family account login.
-   **Recipe Manager:** Create and manage recipes with ingredients and instructions.
-   **Meal Planner:** Add recipes to a weekly meal plan.
-   **Shopping List:** Automatically generated shopping list based on the meal plan.
-   **Schedule:** Shared family calendar with "Copy Previous Week" functionality.

## 📂 Project Structure

```
.
├── client/                 # React Frontend
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── server/                 # Express Backend
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml      # Docker orchestration
└── ...
```

## 🔧 Local Development (Without Docker)

If you prefer to run the services locally:

1.  **Database:** Ensure MongoDB is running locally on port `27017`.
2.  **Server:**
    ```bash
    cd server
    npm install
    npm run dev
    ```
3.  **Client:**
    ```bash
    cd client
    npm install
    npm run dev
    ```
