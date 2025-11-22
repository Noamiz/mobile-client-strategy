# System Sync – End to End Company Products

## 1. Purpose of This File

This document gives AI coding tools and developers a compact overview of:

- The overall multi-repo system.
- The role of this specific repository: `mobile-client-strategy`.
- Where to find deeper documentation (Confluence).

When starting a new session or a big change, load/reference this file so the agent understands the whole picture.

---

## 2. Global System Overview

The system has these main repositories:

1. **common-strategy** – shared TypeScript library for DTOs, constants, logging, and API contracts.
2. **server-strategy** – Node.js TypeScript HTTP API server (auth, domain logic, PostgreSQL).
3. **gateway-strategy** – Node.js real-time gateway (WebSockets) behind Nginx on a LAN device (e.g. NUC).
4. **web-client-strategy** – React + TypeScript web client (user-facing dashboard).
5. **mobile-client-strategy** – React Native + Expo mobile client (this repo).
6. **ai-strategy** – AI/ML services (planned).
7. **internal-tool-strategy** – React + TypeScript internal admin/ops web app.

Shared types and contracts live in `common-strategy` and are consumed by all other repos.

---

## 3. This Repo: `mobile-client-strategy`

**Role:**

The **mobile app** (React Native + Expo + TypeScript) for end users.

**Responsibilities (current & planned):**

- Implement the mobile UI for:
  - Authentication (email + 6-digit code).
  - Later: actual product features (dashboards, real-time views, etc.).
- Consume HTTP APIs from `server-strategy`.
- Later: consume real-time data from `gateway-strategy`.
- Use DTOs and error models from `common-strategy`.

**Initial Auth Flow (MVP):**

- Screen: “Enter your email” → calls `POST /auth/send-code` on `server-strategy`.
- Screen: “Enter your email + 6-digit code” → calls `POST /auth/verify-code`.
- On success:
  - Stores the returned `AuthToken` and `User` client-side (for now in memory or simple storage).
  - Navigates to a “You are logged in” screen.
- On error:
  - Shows human-readable messages based on `ApiError` (`VALIDATION_ERROR`, `UNAUTHORIZED`, etc.).

Backend behavior is implemented in `server-strategy` and documented in Confluence:

- `05 – APIs & Contracts → 5.1 – Authentication (Email + 6-digit Code)`

---

## 4. Testing Expectations

For this repo:

- **Component / screen tests**:
  - Auth screens (send code, verify code).
- **Flow tests**:
  - Basic end-to-end auth flow using React Native Testing Library with mocked HTTP calls.

Every PR should keep:

- `yarn test`
- `yarn lint`
- `yarn build` / `expo-doctor`

green.

See Confluence `6.1 – Testing Strategy & Quality Gates` for the system-wide testing strategy.

---

## 5. Documentation Sources

- Confluence Space: **End to End Company Products**
  - `01 – Vision & Strategy`
  - `02 – System Architecture`
  - `03 – Repositories → mobile-client-strategy`
  - `05 – APIs & Contracts → 5.1 – Authentication (Email + 6-digit Code)`
  - `06 – Operations → 6.1 – Testing Strategy & Quality Gates`
  - `06 – Operations → 6.2 – AI-Orchestrated Development (Target Vision)`
  - `07 – Glossary & Decisions`

If this file and Confluence ever disagree, Confluence is the source of truth and this file should be updated.

---

## 6. How Agents Should Use This

- Assume this app:
  - Authenticates users via `server-strategy` auth endpoints.
  - Reuses shared types from `common-strategy` when shaping request/response DTOs.
- When adding new features:
  - Start from Confluence specs and shared types.
  - Implement UI and HTTP calls here.
  - Add or update tests before making deeper changes.

## 7. UX Contract (E2E-XS v1 – Mobile App)

- Use a bottom tab bar as the primary navigation surface (Home, Live/Sessions, History, Profile).
- Each tab screen should render:
  - a top bar with title and optional actions (filters, settings)
  - content that feels native and touch-friendly (cards, lists, large tap targets).
- Prefer bottom sheets as the main rich-modal pattern instead of full-screen dialogs when possible.
- Use snackbars for transient feedback (success/error) and reserve full-screen or “blocking” modals for critical decisions.
- Keep interactions responsive:
  - pull-to-refresh on lists
  - simple slide/fade transitions between screens
  - visual press feedback on buttons/cards.
- Reuse shared tokens for colors, spacing, and typography so mobile and web feel like the same product family.
- Reserve space in the main nav or profile area for:
  - account settings
  - AI assistant entry point (bottom sheet chat helper).

> **Implementation status (Nov 2025):** `RootNavigator` now renders a MainTabs navigator (Home, Live, History, Profile) with per-screen top bars, shared theme tokens, the reusable `BottomSheet`, snackbar feedback, and multiple entry points into the `MobileAiAssistantSheet` stub, satisfying the E2E-XS mobile shell requirements.
