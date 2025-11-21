# mobile-client-strategy

React Native + Expo + TypeScript **mobile app** for the _End to End Company Products_ system.

This application is the user-facing mobile client. It communicates with:

- [`server-strategy`](https://github.com/Noamiz/server-strategy) for HTTP APIs (auth, domain logic).
- `gateway-strategy` (later) for real-time features.
- Shared DTOs from [`common-strategy`](https://github.com/Noamiz/common-strategy).

---

## Table of Contents

- [Architecture](#architecture)
- [Current Features](#current-features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Related Repositories](#related-repositories)
- [Documentation](#documentation)

---

## Architecture

- Framework: React Native + Expo + TypeScript
- Navigation: (initially simple view state; React Navigation can be added later)
- Tests: Jest + React Native Testing Library
- Shared types: `common-strategy`
- Backend: `server-strategy` (`/auth` endpoints, later more)

For development, the app will call the `server-strategy` API via HTTP (e.g. using a base URL like `http://<dev-machine-ip>:4000`).

---

## Current Features

### Authentication (Email + 6-digit Code, MVP)

Screens:

1. **Send Code Screen**
   - User enters email.
   - App calls `POST /auth/send-code`.
   - On success: shows a message and navigates to the Verify Code screen.
   - On validation error: displays `ApiError.message`.

2. **Verify Code Screen**
   - User enters the same email + 6-digit code.
   - App calls `POST /auth/verify-code`.
   - On success:
     - Stores `User` + `AuthToken` (for MVP we may keep this in simple in-memory state).
     - Navigates to a basic “You are logged in” screen.
   - On error:
     - For expired code → show message telling the user to request a new code.
     - For invalid code → show a generic “code invalid” message.
     - For too many attempts → show a throttling message.

This flow mirrors the backend behavior defined in `server-strategy` and Confluence (`5.1 – Authentication`).

---

## Getting Started

### Prerequisites

- Node.js LTS (e.g. v20+)
- Yarn (classic) or corepack
- `expo-cli` via `npx` (we use `npx expo` commands)
- `server-strategy` running locally and reachable from the emulator / device.

### Install dependencies

```bash

yarn install



Run in development

yarn start

# or

yarn ios

# or

yarn android



Scripts



Example scripts (from package.json):



{

  "scripts": {

    "start": "expo start",

    "android": "expo start --android",

    "ios": "expo start --ios",

    "test": "jest",

    "lint": "eslint app src --ext .ts,.tsx"

  }

}





yarn start – start Expo dev server



yarn ios – run on iOS simulator (macOS)



yarn android – run on Android emulator or device



yarn test – run Jest tests



yarn lint – run ESLint



Project Structure

mobile-client-strategy/

  app/

    # (if using Expo Router) – can be introduced later

  src/

    api/

      authClient.ts        # HTTP calls to /auth endpoints using common-strategy DTOs

    components/

      SendCodeForm.tsx     # Email input + send-code button

      VerifyCodeForm.tsx   # Email + code inputs + verify button

    screens/

      SendCodeScreen.tsx   # Uses SendCodeForm

      VerifyCodeScreen.tsx # Uses VerifyCodeForm

      LoggedInScreen.tsx   # Simple “You are logged in” screen

    hooks/

      useAuth.ts           # Tiny hook to manage auth state in-memory

    App.tsx                # View-state or navigation between auth and logged-in screens

    __tests__/

      authFlow.test.tsx    # Tests for basic auth flow behavior

  app.json or app.config.ts

  babel.config.js

  tsconfig.json

  jest.config.(js|ts)

  .eslintrc.cjs

  .prettierrc

  .gitignore

  package.json

  README.md

  SYSTEM_SYNC.md





This layout can evolve as we add more features and introduce React Navigation or Expo Router.



Testing



We follow the general testing approach from Confluence (6.1 – Testing Strategy & Quality Gates).



For this repo:



Use Jest + React Native Testing Library to:



Test components (forms, screens).



Test basic auth flow using mocked HTTP.



The initial goal:



src/__tests__/authFlow.test.tsx:



Renders the auth screens (via App).



Mocks the HTTP layer used by authClient (e.g. global.fetch).



Asserts that:



Success paths navigate to the “logged in” view.



Error responses show appropriate messages.



All tests should run with:



yarn test



Related Repositories



common-strategy



server-strategy



web-client-strategy



gateway-strategy



internal-tool-strategy



ai-strategy



Documentation



System-level documentation lives in Confluence:



01 – Vision & Strategy



02 – System Architecture



03 – Repositories → mobile-client-strategy



05 – APIs & Contracts → 5.1 – Authentication (Email + 6-digit Code)



06 – Operations → 6.1 – Testing Strategy & Quality Gates



06 – Operations → 6.2 – AI-Orchestrated Development (Target Vision)



07 – Glossary & Decisions



If this README and Confluence ever disagree, Confluence is the source of truth and this file should be updated.

