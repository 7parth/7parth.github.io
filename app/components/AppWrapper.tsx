"use client";
import React, { useState, useEffect } from "react";
import PortfolioShell from "./PortfolioShell";

export default function AppWrapper() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("codexIntroSeen") === "true") {
      setShowIntro(false);
    }
  }, []);

  if (showIntro) {
    return <div>Intro</div>;
  }

  return <PortfolioShell />;
}
