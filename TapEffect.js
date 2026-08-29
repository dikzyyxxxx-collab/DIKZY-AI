"use client";

import { useEffect } from "react";

const WORDS = ["POW!", "BAM!", "ZAP!", "BOOM!", "WHAM!", "KAPOW!"];
const COLORS = ["#111111", "#4a4a4a", "#111111"];

export default function TapEffect() {
  useEffect(() => {
    function handleTap(e) {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      const el = document.createElement("div");
      el.className = "tap-burst";
      el.textContent = WORDS[Math.floor(Math.random() * WORDS.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 650);
    }

    window.addEventListener("click", handleTap);
    return () => window.removeEventListener("click", handleTap);
  }, []);

  return null;
}
