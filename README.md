# Memory

A two-player memory card game that runs in the browser. Two players take turns turning over cards and try to find matching pairs. The player with the most pairs wins.

## Features

- Two players: blue and orange
- Three board sizes: 16, 24 or 36 cards
- Two themes: Code vibes and Gaming, each with its own colours, fonts and images
- Animated card flips
- Game over screen with the final score, followed by a winner or draw screen
- Confirmation dialog before leaving a game

## Rules

1. Choose a theme, a player and a board size on the settings screen. The start button stays disabled until all three are chosen.
2. Turn over two cards. If they match, the current player gets a point and plays again.
3. If they do not match, both cards turn back after one second and the turn passes to the other player.
4. When all pairs are found, the final score is shown, followed by the winner or a draw.

## Getting started

Requirements: [Node.js](https://nodejs.org/) (a current LTS version).

```bash
npm install
npm run dev
```

Then open the address that Vite prints, usually `http://localhost:5173`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build the project into `dist/` |
| `npm run preview` | Serve the built project locally |

## Project structure

```
index.html            Single page with all views
public/               Static files copied as they are (favicon)
src/
  main.ts             Entry point: loads styles and starts the modules
  styles/             SCSS: shared palette, themes, fonts and views
  ts/                 TypeScript modules, one responsibility each
  public/assets/      Images and fonts used by the code
```

### Main modules in `src/ts/`

- `view-navigation.ts`: shows one view at a time
- `settings-*.ts`: settings screen, selection bar and theme preview
- `chosen-settings.ts`: reads the chosen settings and keeps them for the game
- `game-state.ts`: the state of one game (cards, scores, current player)
- `game-flow.ts`: what happens on each card click
- `board.ts`, `game-header.ts`: draw the board and the header
- `game-over.ts`, `winner.ts`: the end-of-game screens
- `exit-dialog.ts`: the confirmation dialog

## Themes

Colours are defined once in `src/styles/_shared.scss`. Each theme is a map in `src/styles/themes.scss` that refers to those colours. The map becomes CSS variables, and the body's `data-theme` attribute selects the active set.

Theme images live in `src/public/assets/themes/<theme-id>/`. The code finds them by file name prefix, for example `label-blue`, `card-symbol-1` or `trophy`. A theme without an image shows nothing in that place.

## Fonts and licences

- Almarai (Regular and Bold), Red Rose and Orbitron are loaded from `src/public/assets/fonts/`.
- Almarai and Orbitron are licensed under the SIL Open Font License; the licence files are in the same folder.
