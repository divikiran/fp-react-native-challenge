# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Fitness Passport coding challenge**: a single-screen React Native app to log fitness activities. The goal is to build a form + list UI with local data persistence. All source code lives in the `app/` subdirectory.

## Commands

All commands must be run from the `app/` directory:

```bash
cd app
npm install          # install dependencies
npm run start        # start Expo dev server
npm run ios          # run on iOS simulator
npm run android      # run on Android emulator
npm run web          # run in browser
```

There is no lint or test script configured by default. If tests are added, install a test runner (e.g., Jest with `jest-expo`) and run with `npx jest`.

## Architecture

- **Entry point:** [app/index.ts](app/index.ts) — registers the root component via `registerRootComponent`
- **Root component:** [app/App.tsx](app/App.tsx) — the single screen; all app logic lives here or in files it imports
- **Config:** [app/app.json](app/app.json) — Expo config (portrait orientation, new architecture enabled)
- **TypeScript:** strict mode enabled via `expo/tsconfig.base`

### Key Technical Decisions to Make

The challenge is intentionally open-ended. When implementing:

1. **State management** — pick a solution and be ready to justify it (e.g., `useState`/`useReducer` with Context, Zustand, or Jotai)
2. **Local persistence** — choose an appropriate library (e.g., `@react-native-async-storage/async-storage` or `expo-sqlite`) and install it via `npm install`
3. **Data model** — activities have at minimum: name (string), duration (number, minutes), optional notes (string); stretch goals add timestamps and delete support

### Challenge Requirements Summary

**MVP:** Form with Activity Name + Duration (required) + Notes (optional), "Log Activity" button, persisted list of logged activities.

**Stretch goals:** delete activity, group by date, total time calculation, timestamps.
