"use client";

import { useState } from "react";

// ContactSection — Mystic Gateway
// Social link grid + raven-dispatch form

const socials = [
  {
    icon: "code",
    label: "GitHub",
    handle: "@7parth",
    href: "https://github.com/7parth",
    accent: "cyan",
  },
  {
    icon: "work",
    label: "LinkedIn",
    handle: "in/parth",
    href: "https://linkedin.com/in/parth",
    accent: "gold",
  },
  {
    icon: "psychology",
    label: "LeetCode",
    handle: "@7parth",
    href: "https://leetcode.com/u/7parth",
    accent: "cyan",
  },
  {
    icon: "alternate_email",
    label: "Email",
    handle: "parth@codex.dev",
    href: "mailto:parth@codex.dev",
    accent: "gold",
  },
] as const;

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `mailto:parth@codex.dev?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <div className="flex flex-col gap-6 section-fade">
      {/* Social links */}
      <div className="grid grid-cols-2 gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relic-stone card-glow p-3 flex items-center gap-3 transition-all duration-300 group"
          >
            <span
              className={`material-symbols-outlined text-2xl icon-engraved transition-colors ${
                s.accent === "cyan"
                  ? "text-rune-glow/55 group-hover:text-rune-glow"
                  : "text-muted-gold/55 group-hover:text-muted-gold"
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {s.icon}
            </span>
            <div>
              <p className="font-label-caps text-[9px] text-on-surface-variant/45 uppercase tracking-[0.2em]">
                {s.label}
              </p>
              <p
                className={`font-body-md text-xs engraved-text transition-colors ${
                  s.accent === "cyan"
                    ? "text-on-surface-variant/75 group-hover:text-icy-cyan"
                    : "text-on-surface-variant/75 group-hover:text-muted-gold"
                }`}
              >
                {s.handle}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Runic divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#2a2a2a]" />
        <span className="font-label-caps text-icy-cyan/30 tracking-[0.4em] text-xs">
          ᚢ ᛗ ᛋ
        </span>
        <div className="h-px flex-1 bg-[#2a2a2a]" />
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/55 engraved-text">
            Your Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Mortal or deity…"
            required
            className="norse-input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/55 engraved-text">
            Your Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="ravens@midgard.realm"
            required
            className="norse-input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-label-caps text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/55 engraved-text">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            placeholder="Speak your mind, warrior…"
            required
            rows={4}
            className="norse-input resize-none"
          />
        </div>

        <button
          type="submit"
          className="shimmer-btn w-full py-3 bg-[#1a1c1e] border border-rune-glow/30 rounded flex items-center justify-center gap-3 hover:border-rune-glow/60 transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <span className="shimmer-layer" />
          {sent ? (
            <>
              <span className="material-symbols-outlined text-rune-glow text-sm icon-engraved">
                check_circle
              </span>
              <span className="font-label-caps text-rune-glow text-[10px] uppercase tracking-[0.3em] engraved-text">
                Raven Dispatched!
              </span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-rune-glow/75 text-sm icon-engraved">
                send
              </span>
              <span className="font-label-caps text-rune-glow/75 text-[10px] uppercase tracking-[0.3em] engraved-text">
                Send Raven
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
