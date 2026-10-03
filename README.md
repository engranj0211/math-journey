# Math Journey

An original, child-friendly math practice app. Phase 1 implements repeatable addition/subtraction worksheets, first-answer accuracy, retries, per-question timing, separate learner profiles, a parent overview and device-local persistence. No Kumon worksheets, assets, branding or code are used.

## Quick start

Requires Node.js 20.19+ (Node 22 recommended) and npm.

```bash
npm install
npm run dev
npm run test
npm run build
npm run preview
```

Open the address printed by Vite. On a fresh device, select **Add a learner**, create a four-digit parent PIN, then add your child. Choose the initial level and daily target. Lock parent mode, select the child's card and start practice. Incorrect answers invite a retry without revealing the solution. After a correct answer, select Next question. Finished worksheets appear in parent history with every first answer, retry count and elapsed time. Save & exit preserves the active worksheet across reloads. One active worksheet per device prevents accidentally overwriting an unfinished session.

## Features delivered

- React + strict TypeScript + Vite + Tailwind CSS 4
- Responsive, keyboard-accessible interface with clear feedback
- Addition, subtraction and mixed worksheets; levels within 10, 20, 50 and 100
- Configurable 5/10/20/30/50-question worksheets, no identical questions in a worksheet
- Daily totals, first-try accuracy and average question time
- Multiple isolated child profiles; parent chooses starting level
- Parent PIN stored as a salted SHA-256 digest, never plain text
- Parent timer toggle, practice targets, result/mistake history and JSON backup download
- LocalStorage through a replaceable storage interface
- Production service worker precaches the built app for offline use after a successful initial visit

Accuracy uses the first attempt. Final completion means each answer was eventually correct. Time is elapsed wall-clock time and includes pauses, time away from the tab and retries; it is not yet an active-attention metric. Daily totals use the device's local calendar date. Refreshing or returning to a worksheet restores progress. The visible timer does not affect recording.

## Architecture

- `src/types/`: models and storage contract
- `src/data/levels.ts`: curriculum configuration
- `src/generators/`: unique question pool generation and mathematical tests
- `src/storage/`: local persistence and PIN hashing
- `src/services/`: daily aggregation and duration formatting
- `src/components/`: reusable PIN and worksheet views
- `src/pages/`: parent management and result history
- `src/App.tsx`: routing state and orchestration
- `src/styles/`: responsive Tailwind entry and custom visual system
- `public/sw.js`, `scripts/precache.mjs`: build-time offline caching

## Curriculum and difficulty

Add an entry in `src/data/levels.ts` to add another numeric range. The generator restricts addition sums to that range and subtraction to nonnegative answers. For a new skill, extend `MathSkill`, the generator, symbol rendering and selector, and add mathematical invariants to tests. Difficulty currently changes only through parent profile settings. Phase 2 should gate automatic advancement using several consecutive worksheets, accuracy and time, rather than completion alone.

## Rewards and future phases

Rewards are not active in Phase 1. The `Reward` model is reserved for Phase 2. Add award logic to a dedicated service at completion, with idempotent daily and streak bonuses and parent-configured rewards. Do not award a retry as another question.

Phase 2: multiplication/division, mastery engine, streaks, rewards, skill trend analysis. Phase 3: placement assessment, printing/answer keys, fractions/decimals/word problems. Phase 4: secure parent accounts, cloud adapter, cross-device synchronization and backup restore. The existing JSON download is an export; there is no restore UI yet.

## Privacy and limitations

No analytics, network accounts or child data uploads. LocalStorage is tied to the browser and origin; clearing site data removes profiles and results. Export backups regularly. A local PIN discourages child access but cannot protect against someone with browser developer tools or physical device control. It is not secure authentication. There is no PIN recovery screen; preserve the PIN. Web Crypto and service workers require HTTPS or localhost. Browser storage quota failures show an error. Bad saved data blocks writes rather than silently overwriting it.

Offline support is enabled in the production build, not Vite development. Visit the hosted app online once and allow service worker installation to finish before disconnecting. A future app update should change the service-worker cache version. An open tab may need reloading to receive the new app. The app does not automatically advance levels in this phase.

## GitHub setup

Create an empty GitHub repository, then from this project directory:

```bash
git init
git add .
git commit -m "Build Math Journey Phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/math-journey.git
git push -u origin main
```

Do not commit `node_modules`, `dist`, child backups or secrets. Commit `package-lock.json`.

## Deployment

`npm run build` outputs `dist/`. This app has no server dependencies. Relative asset URLs allow hosting under a GitHub Pages repository path.

**Vercel:** import the repository, select Vite, set build command `npm run build` and output directory `dist`.

**Netlify:** import the repository, set build command `npm run build` and publish directory `dist`.

**GitHub Pages:** enable Pages with GitHub Actions. Use the included `.github/workflows/pages.yml`; choose your repository's default branch (workflow defaults to main). Pages serves only the build output. HTTPS is needed for offline caching and the PIN hash.

## Validation

`npm test` validates 50-question worksheets across all four levels and three modes, repeatedly checking uniqueness, mathematical answers and nonnegative subtraction. `npm run build` checks TypeScript and builds production assets. Browser interaction testing remains necessary before a public launch; no browser automation run is claimed in this deliverable.
