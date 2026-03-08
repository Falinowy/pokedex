# ⚡ Modern Pokedex - Angular & Signals

Aplikacja Pokedex zbudowana przy użyciu najnowszych standardów **Angular**, oferująca dostęp do bogatej kolekcji kart z dwóch niezależnych źródeł API. Projekt kładzie silny nacisk na wydajność, nowoczesny design (Premium UI) oraz czystą architekturę.

---

## 🚀 Kluczowe Funkcje

- **Podwójne Źródło Danych**: Wybór między `PokemonTCG API` a `TCGdex API` bezpośrednio z poziomu ekranu startowego.
- **Architektura Facade**: Logika biznesowa całkowicie odseparowana od komponentów UI, zarządzana przez serwisy fasadowe.
- **Angular Signals**: Wykorzystanie signali dla reaktywnego i wydajnego zarządzania stanem aplikacji.
- **Premium UI & UX**: Nowoczesny design z efektami *glassmorphism*, gradientami oraz dopracowaną responsywnością (Mobile First).
- **Zaawansowana Nawigacja**: Paginacja sekcji "Similar Cards" umożliwiająca przeglądanie setek rekordów bez obciążania przeglądarki.
- **Inteligentne Cache'owanie**: Wyniki z API są zapamiętywane (Map-based Cache), co eliminuje zbędne zapytania sieciowe.
- **Proaktywna Walidacja**: Formularze edycji z natychmiastowym feedbackiem dla użytkownika (Typed Forms).

---

## 🛠 Stos Technologiczny

- **Framework**: [Angular 21](https://angular.io/)
- **State Management**: Angular Signals
- **Stylizacja**: SCSS (Sass), BEM-ish methodology
- **UI Components**: Angular Material (pola formularzy, snackbary)
- **APIs**: 
  - [tcgdex.net](https://www.tcgdex.net/)
  - [pokemontcg.io](https://pokemontcg.io/)
- **Nawigacja**: Angular Router (Standalone Components)

---

## 📂 Struktura Projektu

- `src/app/service/`: Serwisy fasadowe (Facades) i integracje z API.
- `src/app/components/shared/`: Generyczne komponenty wielokrotnego użytku (np. szczegóły kart).
- `src/app/components/action-bar/`: Zaawansowany moduł paginacji.
- `src/styles/`: Globalny system stylów, mixiny Sass dla przycisków premium.

---

## 🚦 Jak uruchomić projekt?

1. **Sklonuj repozytorium**:
   ```bash
   git clone [url-repozytorium]
   cd pokedex
   ```

2. **Zainstaluj zależności**:
   ```bash
   npm install
   ```

3. **Uruchom serwer deweloperski**:
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem `http://localhost:4200/`.

---

## 🧪 Testowanie

Projekt zawiera skonfigurowane środowisko testowe Karma oraz podstawy pod testy Cypress.
Aby uruchomić testy jednostkowe:
```bash
npm test
```

---

## 💎 Design Notes

Aplikacja implementuje autorski system przycisków `.btn-premium`, zapewniający spójność wizualną między różnymi modułami projektu. Całość została zoptymalizowana pod kątem płynności przejść i estetycznego wyglądu na każdym urządzeniu.
