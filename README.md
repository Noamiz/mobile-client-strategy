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
- Navigation: React Navigation (native stack for auth + bottom tabs for the main shell)
- Shared theme/tokens: `src/theme` (colors, spacing, typography, elevation) applied across screens/components
- Surface primitives: reusable `BottomSheet`, `Snackbar` provider, and AI assistant sheet built on top of the tokens
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

### E2E-XS v1 mobile shell

- **Theme tokens** – light theme defined in `src/theme` for colors, spacing, radii, typography, and elevations.
- **Root navigation** – `src/navigation/RootNavigator.tsx` switches between the auth stack and `MainTabs`.
- **Bottom tab bar** – Home, Live, History, and Profile tabs styled with tokens, each rendering a top bar per the UX contract.
- **Bottom sheet primitives** – `BottomSheet` component plus `MobileAiAssistantSheet` stub that uses it.
  - Currently supports tap-to-dismiss; drag gestures are planned as follow-up polish.
- **Feedback** – `SnackbarProvider` for transient feedback, used in the auth flow (code sent + success) and available app-wide.
- **AI entry points** – Floating action button on Home and a Profile shortcut both launch the assistant sheet stub (local echo only until the backend arrives).
- **Auth integration** – Existing OTP flow now lives inside the auth stack while successful verification transitions to the tabbed shell.

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

      BottomSheet.tsx

      ai/MobileAiAssistantSheet.tsx

      layout/AppHeader.tsx, layout/IconButton.tsx

      snackbar/…           # Snackbar + provider

      SendCodeForm.tsx / VerifyCodeForm.tsx

    hooks/

      useAuth.ts           # Auth provider/context

    navigation/

      RootNavigator.tsx    # Auth stack + MainTabs

    screens/

      Auth screens + Home, Live, History, Profile tabs

    testUtils/

      renderWithProviders.tsx

    __tests__/

      authFlow.test.tsx, aiAssistant.test.tsx

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

