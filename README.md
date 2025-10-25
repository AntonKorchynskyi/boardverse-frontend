# BoardVerse — Frontend

BoardVerse is a web platform for discovering and playing board games online. This repository contains the Next.js frontend that powers browsing titles, authentication, player profiles with stats, and a real‑time multiplayer Tic‑Tac‑Toe powered by boardgame.io.

- Live site: https://boardverse.vercel.app/

## Features

- Game browsing with featured titles and per‑game pages (`/browse`, `/browse/tic-tac-toe`).
- Account login/registration and protected profile area (`/login`, `/registration`, `/profile`).
- Profile dashboard with level, rank score, and game stats (wins/losses, win rate).
- Multiplayer Tic‑Tac‑Toe using boardgame.io with lobby create/join flows and live play (`/tic-tac-toe-game`).
- In‑game toasts for turns/results and automatic stat updates after matches.
- Responsive UI with Tailwind CSS and DaisyUI components.

## Tech Stack

- Next.js 15 App Router (React 19 RC)
- Tailwind CSS + DaisyUI
- boardgame.io (multiplayer + lobby)
- Zod (form validation), jwt-decode (auth token handling)
- Lucide icons, React Toastify

## Architecture Overview

- Frontend routes live under `app/` and use the App Router.
  - Public: `app/(default)` (home, browse, about, auth, etc.).
  - Game: `app/(game)/tic-tac-toe-game` (boardgame.io client, board, game logic).
- Profile is protected by middleware (`app/middleware.jsx`) requiring an `access_token` cookie.
- Server actions and API routes:
  - Server actions in `app/(default)/_actions/*` handle login, match creation/joining, and profile helpers.
  - Next API routes proxy to the backend for stats/profile updates: `app/(default)/api/updateStats/route.jsx`, `app/(default)/api/updateUserProfile/route.jsx`.

## Backend and Multiplayer Services

- Application backend (auth, profile, stats): `https://boardverse-backend.onrender.com`
  - Login (`/auth/login`) returns a JWT that is stored in an `access_token` HTTP‑only cookie.
  - Profile (`/user/profile`) and Stats (`/stats/stats`) are accessed via Next server actions/API routes with the bearer token.
- boardgame.io server (local, required for multiplayer):
  - Socket transport: `ws://localhost:8000` (configured in `app/(game)/tic-tac-toe-game/page.js`).
  - Lobby REST endpoints (create/join/list/leave): `http://localhost:8001/games/tic-tac-toe/*` (used by server actions and lobby UI).

Note: The boardgame.io server is not included in this repo. You need to run one locally exposing the above ports and the Tic‑Tac‑Toe game named `tic-tac-toe` to match the client configuration.

## Local Development

Prerequisites:
- Node.js 18+ (LTS recommended)
- A running boardgame.io server on ports 8000 (Socket.IO) and 8001 (Lobby REST)

Install dependencies and start the dev server:

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Multiplayer setup (boardgame.io):
- Start or point to a boardgame.io server that registers the `tic-tac-toe` game and exposes:
  - Socket.IO at `ws://localhost:8000`
  - Lobby REST at `http://localhost:8001/games/tic-tac-toe`
- The frontend uses these endpoints for creating/joining matches, listing lobbies, and gameplay sync.

Authentication:
- Login uses the deployed backend at `boardverse-backend.onrender.com` and sets an `access_token` cookie on success.
- Profile and stats pages require a valid token; otherwise, access is blocked by middleware.

## Key Paths

- Home: `app/(default)/page.js`
- Browse: `app/(default)/browse/page.js`
- Tic‑Tac‑Toe hub: `app/(default)/browse/tic-tac-toe/page.js`
- Game client: `app/(game)/tic-tac-toe-game/page.js`
- Game logic: `app/(game)/tic-tac-toe-game/TicTacToeGame.jsx`
- Game board UI: `app/(game)/tic-tac-toe-game/TicTacToeBoard.jsx`
- Lobby UI: `components/LobbyScreen.jsx`, `components/HostGame.jsx`, `components/LobbyItem.jsx`
- Auth: `app/(default)/login/page.js`, `app/(default)/login/actions.jsx`
- Profile: `app/(default)/profile/page.js`, middleware: `app/middleware.jsx`

## Deployment

- Deployed on Vercel: https://boardverse.vercel.app/

## Notes and Limitations

- Only Tic‑Tac‑Toe is implemented for gameplay for now;
- Local multiplayer requires a compatible boardgame.io server; endpoints are currently hard‑coded to localhost.
- React/Next are on RC versions; behavior may change with upstream updates.
