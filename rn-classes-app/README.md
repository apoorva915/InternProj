## Assignment

Simple two-screen app showcasing class browsing with filters and optimistic booking, and a profile screen with editable name saved locally.

### Setup

1. Navigate to the project directory
```bash
cd rn-classes-app
```
2. Install dependencies
```bash
npm install
```
3. Start the app
```bash
npx expo start
```
4. Run on device/emulator
```bash
# Android
npx expo start --android
# iOS (Mac)
npx expo start --ios
# Web
npx expo start --web
```

### Features

- Home/Browse: filter by level (chips) and instructor (modal list)
- Quick Book with optimistic update and 15% failure rollback + toast
- Loading spinner for ~1.2s on launch
- Empty state with Clear Filters action
- Profile: avatar placeholder, name, phone, credits, city, joined date
- Edit name via modal; persisted to AsyncStorage

### Design Notes / Trade-offs

- **State management**: Local component state + a tiny custom hook (`useProfile`) kept the footprint small—no Redux/Zustand needed for this scope.
- **Optimistic booking**: Immediate UI update for responsiveness; rollback on error with a toast. Trade‑off: brief inconsistency when a failure occurs.
- **Failure simulation**: `Math.random() < 0.15` mimics unreliable networks. For deterministic demos, temporarily override `Math.random` in the console or increase the threshold.
- **Credits constraint**: Blocks booking at 0 credits and deducts on success; includes a Profile “Reset profile” for quick testing. Trade‑off: mock only; no server truth.
- **Theming**: Dark and light palettes via `ThemeProvider` with AsyncStorage persistence. UI primitives (`Card`, `Title`, `Meta`, `Chip`, modals) consume theme tokens for consistent contrast. Trade‑off: a few accent constants remain (e.g., progress bar fill).
- **UI primitives over UI kit**: Faster build and smaller bundle; fewer baked‑in a11y affordances than a full design system.
- **Navigation**: Bottom tabs with brand header “AlignTurtle”; simple stack since app is small.
- **Lists**: `FlatList` is sufficient for this dataset. `FlashList` is installed for headroom but not required.
- **Persistence**: Profile and theme saved locally with AsyncStorage. Trade‑off: no cross‑device sync.
- **Web-first demo**: Runs on web for easy recording; mobile-ready deps (gestures/safe area) included.

### Evaluation highlights

- TypeScript-first components and domain types (`ClassItem`, `UserProfile`)
- Optimistic booking with 15% failure rollback and visual toast state
- Credits constraint: prevents booking when 0 credits; deducts credit on success
- Local persistence via `AsyncStorage` for profile data and credits
- Modular UI primitives (`Card`, `Chip`, `Hero`) and simple theme tokens
- Clear empty, loading, and error/success feedback states

