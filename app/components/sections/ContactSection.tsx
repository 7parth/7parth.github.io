"use client";

import { useState } from "react";

// Social link grid + raven-dispatch form
import EntryMarker from "../ui/EntryMarker";

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
    handle: "@Parth-Waradkar",
    href: "https://www.linkedin.com/in/parth-waradkar-7w/",
    accent: "gold",
  },
  {
    icon: "psychology",
    label: "LeetCode",
    handle: "@7_parth",
    href: "https://leetcode.com/u/7_parth",
    accent: "cyan",
  },
  {
    icon: "alternate_email",
    label: "Email",
    handle: "@waradkarparth@gmail.com",
    href: "mailto:waradkarparth@gmail.com",
    accent: "gold",
  },
] as const;

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "70c9372a-10f3-41e1-97f9-26f052daddde", // <--- IMPORTANT: Replace this with your key from web3forms.com
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "New Message from Portfolio Codex",
          from_name: "Portfolio Codex Raven"
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" }); // Clear form on success
        setTimeout(() => setSent(false), 3500);
      } else {
        console.error("Failed to send raven:", result);
      }
    } catch (error) {
      console.error("Error dispatching raven:", error);
    }
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
            className="flex items-center gap-2 transition-all duration-300 group py-2 border-b border-faded-bronze/10 last:border-b-0"
          >
            <div className="flex-1 flex flex-col">
              <span className="font-[family-name:var(--font-cinzel)] text-[11px] text-on-surface-variant/70 uppercase tracking-[0.2em] flex items-center group-hover:text-frost-white transition-colors">
                <EntryMarker />
                {s.label}
              </span>
              <p
                className={`font-[family-name:var(--font-ibm-plex)] text-[14px] engraved-text transition-colors pl-6 ${s.accent === "cyan"
                  ? "text-on-surface-variant/50 group-hover:text-icy-cyan"
                  : "text-on-surface-variant/50 group-hover:text-muted-gold"
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
          <label className="font-[family-name:var(--font-cinzel)] text-[11px] uppercase tracking-[0.2em] text-muted-gold/70 font-medium engraved-text">
            Your Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Mortal or deity…"
            required
            className="norse-input font-[family-name:var(--font-ibm-plex)] text-[15px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-cinzel)] text-[11px] uppercase tracking-[0.2em] text-muted-gold/70 font-medium engraved-text">
            Your Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="ravens@midgard.realm"
            required
            className="norse-input font-[family-name:var(--font-ibm-plex)] text-[15px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-cinzel)] text-[11px] uppercase tracking-[0.2em] text-muted-gold/70 font-medium engraved-text">
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
            className="norse-input resize-none font-[family-name:var(--font-ibm-plex)] text-[15px]"
          />
        </div>

        <button
          type="submit"
          className="shimmer-btn w-full py-3 bg-[#1a1c1e] border border-rune-glow/30 rounded flex items-center justify-center gap-3 hover:border-rune-glow/60 transition-colors shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <span className="shimmer-layer" />
          {sent ? (
            <span className="font-[family-name:var(--font-cinzel)] text-rune-glow text-[12px] uppercase tracking-[0.2em] font-semibold engraved-text">
              Raven Dispatched!
            </span>
          ) : (
            <span className="font-[family-name:var(--font-cinzel)] text-rune-glow/90 text-[12px] uppercase tracking-[0.2em] font-semibold engraved-text">
              Send Raven
            </span>
          )}
        </button>
      </form>

      {/* Easter Egg */}
      <div className="mt-12 pt-8 flex flex-col items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-700 border-t border-faded-bronze/10">
        <p className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-muted-gold/50 text-center mb-4 engraved-text max-w-xs">
          Since you scrolled this far to contact me...<br/>here is an easter egg
        </p>
        <div className="w-40 relative rounded border border-muted-gold/20 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img 
            src="/kratos-heart.gif" 
            alt="Easter Egg" 
            className="w-full h-auto object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
