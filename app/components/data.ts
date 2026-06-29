// ============================================================
//  data.ts — Relic definitions & section types
//  All 15 navigation relics with Norse-themed metadata
// ============================================================

export type SectionId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "achievements"
  | "education"
  | "resume"
  | "github"
  | "linkedin"
  | "leetcode"
  | "contact"
  | "timeline";

export interface Relic {
  id: SectionId;
  /** Material Symbols icon name */
  icon: string;
  /** Main label shown on the relic tile */
  label: string;
  /** Two-line Norse subtitle shown below the label */
  sublabel: [string, string];
  /** Title shown as the big heading in the codex panel */
  codexTitle: string;
  /** Small all-caps label shown above the big heading */
  codexLabel: string;
  /** Icon shown in the codex panel header */
  runeSymbol: string;
}

export const relics: Relic[] = [
  {
    id: "about",
    icon: "change_history",
    label: "About Me",
    sublabel: ["Warrior's", "Chronicle"],
    codexTitle: "About Me",
    codexLabel: "WARRIOR'S CHRONICLE",
    runeSymbol: "change_history",
  },
  {
    id: "projects",
    icon: "hardware",
    label: "Projects",
    sublabel: ["Legendary", "Quests"],
    codexTitle: "Projects",
    codexLabel: "LEGENDARY QUESTS",
    runeSymbol: "hardware",
  },
  {
    id: "experience",
    icon: "shield",
    label: "Experience",
    sublabel: ["Battles", "Fought"],
    codexTitle: "Experience",
    codexLabel: "BATTLES FOUGHT",
    runeSymbol: "shield",
  },
  {
    id: "skills",
    icon: "swords",
    label: "Skills",
    sublabel: ["Weapons", "Mastered"],
    codexTitle: "Skills",
    codexLabel: "WEAPONS MASTERED",
    runeSymbol: "swords",
  },
  {
    id: "achievements",
    icon: "emoji_events",
    label: "Achievements",
    sublabel: ["Trophies of", "Valhalla"],
    codexTitle: "Achievements",
    codexLabel: "TROPHIES OF VALHALLA",
    runeSymbol: "emoji_events",
  },
  {
    id: "education",
    icon: "menu_book",
    label: "Education",
    sublabel: ["Scrolls of", "Knowledge"],
    codexTitle: "Education",
    codexLabel: "SCROLLS OF KNOWLEDGE",
    runeSymbol: "menu_book",
  },
  {
    id: "resume",
    icon: "history_edu",
    label: "Resume",
    sublabel: ["Ancient", "Scroll"],
    codexTitle: "Resume",
    codexLabel: "THE ANCIENT SCROLL",
    runeSymbol: "history_edu",
  },
  {
    id: "github",
    icon: "code",
    label: "GitHub",
    sublabel: ["Forge", "Archives"],
    codexTitle: "GitHub",
    codexLabel: "FORGE ARCHIVES",
    runeSymbol: "code",
  },
  {
    id: "linkedin",
    icon: "work",
    label: "LinkedIn",
    sublabel: ["Hall of", "Allies"],
    codexTitle: "LinkedIn",
    codexLabel: "HALL OF ALLIES",
    runeSymbol: "work",
  },
  {
    id: "leetcode",
    icon: "psychology",
    label: "LeetCode",
    sublabel: ["Trials of", "Wisdom"],
    codexTitle: "LeetCode",
    codexLabel: "TRIALS OF WISDOM",
    runeSymbol: "psychology",
  },
  {
    id: "contact",
    icon: "explore",
    label: "Contact",
    sublabel: ["Mystic", "Gateway"],
    codexTitle: "Contact",
    codexLabel: "MYSTIC GATEWAY",
    runeSymbol: "explore",
  },
  {
    id: "timeline",
    icon: "timeline",
    label: "Timeline",
    sublabel: ["Path of", "the Ghost"],
    codexTitle: "Timeline",
    codexLabel: "PATH OF THE GHOST",
    runeSymbol: "timeline",
  },
];

/** Runic characters used in the codex header divider */
export const RUNES = ["ᛚ", "ᛗ", "ᚢ", "ᛋ", "ᛏ"] as const;

/** Background image URL — cinematic ruined Nordic temple (from Stitch design) */

