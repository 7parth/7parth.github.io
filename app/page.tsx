"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PortfolioShell from "./components/PortfolioShell";
import CinematicLoader from "./components/ui/CinematicLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <CinematicLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && <PortfolioShell />}
    </>
  );
}
