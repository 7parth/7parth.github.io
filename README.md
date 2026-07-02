# Parth's Codex — Chronicles of an AI Engineer

Welcome to **Parth's Codex**, a highly interactive, cinematic, God-of-War-inspired developer portfolio. This isn't just a static resume; it's a digital realm forged with ancient Norse aesthetics, intricate animations, and a monolithic atmosphere, built to showcase the journey, skills, and legendary quests of an AI Engineer.

## ⚔️ The Vision

> *"Knowledge is not collected. It is forged."*

Most portfolios are built to be quickly scanned by recruiters. This one was built to impress Kratos. 
It leverages advanced frontend animation techniques to create a AAA-game-like feel in the browser, featuring heavy, deliberate animations, magical path tracing, and deep environmental storytelling.

## ✨ Features

- **Cinematic Loading Sequence**: A custom, skippable preloader that immerses the user with dynamic Mimir quotes and an engraved loading line.
- **Relic Wall Interface**: Navigation is driven by interacting with ancient Norse "relics".
- **The Codex Cinematic**: Opening a section triggers a complex, multi-phase sequence (powered by Framer Motion and GSAP) where a stone slab reveals the content.
- **Magical Path Overlay**: An SVG-based dynamic glowing path system that connects relics as you hover and navigate.
- **Environmental Immersion**: Ghostly whispers, subtle parallax background effects, breathing animations, and dynamic ambient lighting based on the active realm.
- **Performance Optimized**: Despite heavy visuals, animations are hardware-accelerated, utilizing Framer Motion and GSAP efficiently alongside Next.js Server Components.

## 🛠️ Forged With (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 18+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) (Declarative UI transitions, page reveals)
  - [GSAP](https://gsap.com/) (Imperative micro-interactions, heavy stone-press physics, camera breathing)
- **Language**: TypeScript

## 🚀 Awakening the Codex (Local Setup)

To summon this realm on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Ignite the development forge:**
   ```bash
   npm run dev
   # or yarn dev / pnpm dev
   ```

4. **Enter the realm:**
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📜 Realm Navigation (Architecture)

- `app/components/ui/` — Core UI elements: magical overlays, cinematic loaders, and the relic tiles.
- `app/components/sections/` — The content modules (About, Projects, Experience, Skills, Lore, etc.) that render inside the Codex.
- `app/components/PortfolioShell.tsx` — The main orchestrator connecting the relic wall, cinematic codex, and environmental layers.
- `app/lib/` — Shared animation variants (`animations.ts`), timing hooks, and constants defining the AAA-feel.
- `public/` — Static textures, icons, runic symbols, and backgrounds.

## 🛡️ License

This project is handcrafted in Midgard. Feel free to explore the source code to see how the magic works under the hood.

---
*© 985 ÆSIR REALM - HANDCRAFTED IN MIDGARD*
