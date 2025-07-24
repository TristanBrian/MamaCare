# Maternal Health Web Application - Project Documentation

## Overview
This project is a React + TypeScript web application designed to provide maternal health resources, community support, emergency information, and personalized user dashboards. It aims to assist pregnant women, healthcare providers, and administrators with educational content, appointment scheduling, notifications, and AI-assisted pregnancy guidance.

## Main Features
- **Educational Content:** Pages like Home, Education, Prenatal, FAQ provide pregnancy-related information in English and Swahili.
- **Community Support:** Community page for user interaction and support.
- **Emergency Information:** Emergency page with critical health information.
- **User Authentication:** Registration and login for different user roles (admin, doctor, hospital, patient).
- **Role-Based Dashboards:** Protected routes with role-based access control for admins, healthcare providers, and patients.
- **Pregnancy FAQ Component:** Interactive FAQ with search, categories, and feedback.
- **AI Pregnancy Assistant:** Provides medically verified information and chat assistance.
- **Appointment Scheduling and Notifications:** Components for managing appointments and notifications.
- **Multi-language Support:** English and Swahili language contexts.
- **UI Components:** Custom UI components for cards, buttons, accordions, toasts, etc.
- **State Management:** React Context for language and authentication, React Query for data fetching.

## Project Structure
- `src/`
  - `components/`: Reusable UI components and feature-specific components (e.g., pregnancy, appointment, auth, notification, ui).
  - `contexts/`: React Context providers for language and authentication.
  - `hooks/`: Custom React hooks.
  - `lib/`: Utility functions.
  - `pages/`: Route components for main pages like Home, Education, Prenatal, Community, Emergency, FAQ, Register, LoginPage, Dashboard.
  - `App.tsx`: Main app component with routing and providers.
  - `main.tsx`: App entry point.
- `public/`: Static assets like favicon, robots.txt.
- Configuration files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `eslint.config.js`, etc.

## Routing and Navigation
- Uses React Router for client-side routing.
- Public routes: Home, Education, Prenatal, Community, Emergency, FAQ, Register, Login.
- Protected routes: Dashboard and sub-routes with role-based access (admin, doctor, hospital, patient).
- Header and Footer components are rendered on all pages.

## Context Providers
- `LanguageProvider`: Manages language state (English/Swahili).
- `AuthProvider`: Manages user authentication and roles.
- `QueryClientProvider`: React Query client for server state management.

## Role-Based Access Control
- `ProtectedRoute` component restricts access based on user roles.
- Routes for admin, healthcare providers, and patients have specific access controls.

## UI Libraries and Tools
- Custom UI components under `src/components/ui`.
- Icons from `lucide-react`.
- React Query for data fetching.
- Tailwind CSS for styling.
- Vite as the build tool.

## Running the Project
- Install dependencies: `npm install` or `yarn install`.
- Start development server: `npm run dev` or `yarn dev`.
- Access the app at `http://localhost:8080/`.

## Testing
- Manual testing recommended for navigation, authentication flows, role-based access, and UI components.
- Automated tests can be added for critical components and API endpoints.

---

This documentation provides a comprehensive overview of the project contents and structure. Please let me know if you need detailed documentation for specific modules or components.
