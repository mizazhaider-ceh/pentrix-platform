import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The PenTrix | Learn Cybersecurity in the Right Order",
  description:
    "192 verified cybersecurity resources, sequenced roadmaps, honest costs. Free forever.",
};

/**
 * Runs before first paint (first child of <body>, executes during
 * parsing): reads the stored theme, falls back to prefers-color-scheme
 * on first visit (light -> paper, otherwise the ink default), and sets
 * data-theme on <html> so the correct palette is active immediately.
 * Kept dependency-free and client-side only for static export.
 */
const themeInitScript = `(function(){try{var k='pentrix-theme';var t=null;try{t=localStorage.getItem(k);}catch(e){}if(t!=='ink'&&t!=='paper'&&t!=='phosphor'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'paper':'ink';try{localStorage.setItem(k,t);}catch(e){}}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} bg-ink text-zinc-100 antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-signal"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
