# Mineralink

A beautiful interactive visualization of mineral and vitamin interactions in the human body.

## Features
- **Mineral Interaction Wheel:** Visualize minerals and vitamins as nodes on a circular wheel.
- **Synergistic & Antagonistic Relationships:** Click any mineral/vitamin to see which others enhance (synergistic) or inhibit (antagonistic) its function.
- **Color-coded Interactions:** Selected minerals are highlighted; antagonistic relationships are shown in red.
- **Responsive UI:** Modern, mobile-friendly design using React and Tailwind CSS.
- **Tooltips:** Hover over any mineral/vitamin to see a brief description.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn, but pnpm is recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Mineralink
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

- `src/App.tsx` — Main React component for the wheel UI
- `src/domain/` — Domain logic, types, and transformation utilities for minerals and vitamins
- `src/domain/mineral-utils.ts` — Functions for transforming and parsing mineral data
- `src/domain/Mineral.ts` — Type definitions for minerals, vitamins, and relationships

## Customization
- Add or edit minerals/vitamins and their relationships in the data source in `src/domain/mineral-utils.ts`.
- Adjust styles in `src/App.css` or extend with Tailwind classes.

## License
MIT
