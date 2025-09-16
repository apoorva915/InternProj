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

### DEMO VIDEO

https://drive.google.com/file/d/1zDWSUMNUzy0xEp4GqM9LRw5p_wswhzOL/view?usp=sharing

### DEMO SCREENSHOTS

<img width="1919" height="994" alt="image" src="https://github.com/user-attachments/assets/14851456-f028-4b58-bac8-9adf4a1f31d4" />
<img width="1919" height="1095" alt="image" src="https://github.com/user-attachments/assets/e8bc1536-912b-4563-be90-09b00c14a48f" />
<img width="1919" height="1090" alt="image" src="https://github.com/user-attachments/assets/0845c4cd-826a-4ff2-a778-eb4ac441a871" />
<img width="1919" height="1095" alt="image" src="https://github.com/user-attachments/assets/dffc0997-888c-4baa-81fd-fef6a324adba" />
<img width="1916" height="1085" alt="image" src="https://github.com/user-attachments/assets/1cbe42f3-19d9-41b7-be2c-6dc2f3b0b68d" />
<img width="1919" height="1089" alt="image" src="https://github.com/user-attachments/assets/21956ed6-5306-431b-9afd-89fcb037d57d" />
<img width="1919" height="1098" alt="image" src="https://github.com/user-attachments/assets/0681e2e0-5396-4c7a-be6f-1c8f975c8560" />
<img width="1919" height="1089" alt="image" src="https://github.com/user-attachments/assets/d707c041-b07f-423c-8a8c-4dcb610f4b59" />
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/f12093e7-daf5-4507-861b-dac83b76756e" />
<img width="1919" height="1085" alt="image" src="https://github.com/user-attachments/assets/080f88b2-77d9-42b0-a0d7-383d057b94c9" />
<img width="1919" height="1091" alt="image" src="https://github.com/user-attachments/assets/71a6a1fc-52e6-4311-934d-89bdfd3c8103" />
<img width="1919" height="1091" alt="image" src="https://github.com/user-attachments/assets/9325a234-6ef1-43ec-86c6-7b9e946abfac" />
<img width="1919" height="1088" alt="image" src="https://github.com/user-attachments/assets/305be258-7103-492d-b1cc-b628aa69f7e5" />







