import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KRATOS' CODEX — Chronicles of a Warrior",
  description:
    "A cinematic Norse-mythology-themed developer portfolio. Final year Computer Engineering student building efficient, scalable, and impactful digital solutions.",
  keywords: [
    "portfolio",
    "developer",
    "full stack",
    "computer engineering",
    "software engineer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cinzel.variable} dark h-full`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          precedence="default"
        />
      </head>
      <body className="h-full overflow-hidden bg-surface-container-lowest text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
