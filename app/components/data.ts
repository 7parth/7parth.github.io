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
  /** Material Symbols icon name (fallback when no iconImg) */
  icon: string;
  /** Path to a custom PNG icon in /assets/icons/ — takes precedence over `icon` on the relic tile */
  iconImg?: string;
  /** Scale multiplier for iconImg when the image has excess padding (default 1) */
  iconScale?: number;
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
  /** A concise 2-3 line summary describing what the visitor is about to explore */
  loreSummary: string;
  /** Optional URL to open in a new tab instead of opening a Codex section */
  externalLink?: string;
}

export const relics: Relic[] = [
  {
    id: "about",
    icon: "change_history",
    iconImg: "/icons/aboutme.png",
    iconScale: 1.5,
    label: "About Me",
    sublabel: ["Warrior's", "Chronicle"],
    codexTitle: "About Me",
    codexLabel: "WARRIOR'S CHRONICLE",
    runeSymbol: "change_history",
    loreSummary: "Unveil the origins and philosophy of the AI Engineer. A testament to relentless curiosity and the pursuit of intelligent systems.",
  },
  {
    id: "projects",
    icon: "hardware",
    iconImg: "/icons/axe.png",
    label: "Projects",
    sublabel: ["Legendary", "Quests"],
    codexTitle: "Projects",
    codexLabel: "LEGENDARY QUESTS",
    runeSymbol: "hardware",
    loreSummary: "Examine the artifacts forged in the fires of creation. Each project stands as a monolithic achievement in software craftsmanship.",
  },
  {
    id: "experience",
    icon: "shield",
    iconImg: "/icons/experience.png",
    label: "Experience",
    sublabel: ["Battles", "Fought"],
    codexTitle: "Experience",
    codexLabel: "BATTLES FOUGHT",
    runeSymbol: "shield",
    loreSummary: "Witness the scars and victories earned across various battlefields. A record of professional endeavors and collaborative conquests.",
  },
  {
    id: "skills",
    icon: "swords",
    iconImg: "/icons/skills.png",
    label: "Skills",
    sublabel: ["Weapons", "Mastered"],
    codexTitle: "Skills",
    codexLabel: "WEAPONS MASTERED",
    runeSymbol: "swords",
    loreSummary: "Review the arsenal of languages, frameworks, and tools. Weapons honed and mastered for modern digital warfare.",
  },
  {
    id: "achievements",
    icon: "emoji_events",
    iconImg: "/icons/achievements.png",
    label: "Achievements",
    sublabel: ["Trophies of", "Valhalla"],
    codexTitle: "Achievements",
    codexLabel: "TROPHIES OF VALHALLA",
    runeSymbol: "emoji_events",
    loreSummary: "Behold the glories and honors claimed in competitive arenas. Trophies that echo through the halls of eternity.",
  },
  {
    id: "education",
    icon: "menu_book",
    iconImg: "/icons/book.png",
    label: "Education",
    sublabel: ["Scrolls of", "Knowledge"],
    codexTitle: "Education",
    codexLabel: "SCROLLS OF KNOWLEDGE",
    runeSymbol: "menu_book",
    loreSummary: "Trace the academic lineage and foundational knowledge. Ancient scrolls detailing the pursuit of higher learning.",
  },
  {
    id: "resume",
    icon: "history_edu",
    iconImg: "/icons/resume.png",
    label: "Resume",
    sublabel: ["Ancient", "Scroll"],
    codexTitle: "Resume",
    codexLabel: "THE ANCIENT SCROLL",
    runeSymbol: "history_edu",
    loreSummary: "A condensed parchment detailing a journey of mastery. The definitive scroll containing all worldly experience.",
  },
  {
    id: "github",
    icon: "code",
    iconImg: "/icons/github.png",
    label: "GitHub",
    sublabel: ["Forge", "Archives"],
    codexTitle: "GitHub",
    codexLabel: "FORGE ARCHIVES",
    runeSymbol: "code",
    loreSummary: "Enter the grand forge where code is hammered into reality. A repository of open-source contributions and active projects.",
    externalLink: "https://github.com/7parth",
  },
  {
    id: "linkedin",
    icon: "work",
    iconImg: "/icons/linkedin.png",
    label: "LinkedIn",
    sublabel: ["Hall of", "Allies"],
    codexTitle: "LinkedIn",
    codexLabel: "HALL OF ALLIES",
    runeSymbol: "work",
    loreSummary: "A networking hall connecting warriors across realms. Professional alliances and endorsements from fellow creators.",
    externalLink: "https://linkedin.com/in/parth-waradkar-7w",
  },
  {
    id: "leetcode",
    icon: "psychology",
    iconImg: "/icons/leetcode.png",
    label: "LeetCode",
    sublabel: ["Trials of", "Wisdom"],
    codexTitle: "LeetCode",
    codexLabel: "TRIALS OF WISDOM",
    runeSymbol: "psychology",
    loreSummary: "A proving ground for algorithmic mastery and logic. Trials undertaken to sharpen the mind and optimize execution.",
    externalLink: "https://leetcode.com/u/7_parth/",
  },
  {
    id: "contact",
    icon: "explore",
    iconImg: "/icons/contact.png",
    label: "Contact",
    sublabel: ["Mystic", "Gateway"],
    codexTitle: "Contact",
    codexLabel: "MYSTIC GATEWAY",
    runeSymbol: "explore",
    loreSummary: "A mystic gateway to establish direct communication. Send a raven across the realms to forge new alliances.",
  },
  {
    id: "timeline",
    icon: "timeline",
    label: "Timeline",
    sublabel: ["Path of", "the Ghost"],
    codexTitle: "Timeline",
    codexLabel: "PATH OF THE GHOST",
    runeSymbol: "timeline",
    loreSummary: "A chronological map of the journey so far. Key milestones and transitions across the path of the ghost.",
  },
];

/** Runic characters used in the codex header divider */
export const RUNES = ["ᛚ", "ᛗ", "ᚢ", "ᛋ", "ᛏ"] as const;

/** Background image URL — cinematic ruined Nordic temple (from Stitch design) */

