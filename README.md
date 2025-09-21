# Banco App Frontend

This project is the frontend for the Banco App, developed with React, TypeScript, and Vite.

## Installation and Startup

To get the project up and running, follow these steps:

1.  **Prerequisites:** Make sure you have [pnpm](https://pnpm.io/installation) installed.
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

-   `pnpm run dev`: Starts the development server.
-   `pnpm run build`: Compiles the project for production.
-   `pnpm run lint`: Runs the linter to check for code quality.
-   `pnpm run preview`: Serves the production build locally for preview.

## Folder Structure

The project follows a specific folder structure to maintain organization and scalability. When adding new files, please adhere to the following guidelines:

-   `src/assets`: For static assets like images, fonts, etc.
-   `src/components`: For reusable React components. Each component should have its own folder containing the component file (`.tsx`) and its corresponding stylesheet (`.css`).
    ```
    /components
    └── /ComponentName
        ├── ComponentName.tsx
        └── ComponentName.css
    ```
-   `src/hooks`: For custom React hooks.
-   `src/layouts`: For component layouts that define the structure of a page (e.g., `MainLayout`, `AuthLayout`).
-   `src/lib`: For external libraries or utility functions that are not specific to the application's business logic.
-   `src/pages`: For the main pages of the application. Each page may have its own folder if it's complex.
-   `src/routes`: For route definitions and configuration.
-   `src/services`: For services that interact with external APIs.
-   `src/stores`: For state management stores (Zustand).
-   `src/types`: For TypeScript type and interface definitions.
-   `src/utils`: For utility functions specific to the application's business logic.