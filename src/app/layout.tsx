import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  applicationName: "Ankur Rana",
  title: {
    default: "Ankur Rana — AI-Assisted Developer, Programmer, Author & Researcher",
    template: "%s | Ankur Rana",
  },
  description:
    "Ankur Rana builds software, writes books, and conducts independent research. AI-assisted developer, programmer, author, and independent researcher based in India.",
  creator: "Ankur Rana",
  publisher: "Ankur Rana",
  authors: [{ name: "Ankur Rana" }],
  category: "Personal Portfolio",
  keywords: [
    "Ankur Rana",
    "developer",
    "programmer",
    "AI-assisted development",
    "author",
    "independent researcher",
    "Ezra programming language",
    "Rust",
    "Next.js",
    "research papers",
    "Zenodo",
    "Kindle books",
    "time",
    "consciousness",
    "Awadhi",
    "Hindi poetry",
  ],
  openGraph: {
    title: "Ankur Rana — AI-Assisted Developer, Programmer, Author & Researcher",
    description:
      "Building software, exploring ideas, and turning curiosity into working products.",
    type: "website",
    siteName: "Ankur Rana",
  },
  twitter: {
    card: "summary",
    title: "Ankur Rana — Developer, Author & Researcher",
    description:
      "Building software, exploring ideas, and turning curiosity into working products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8F7F4] text-[#111111]">{children}</body>
    </html>
  );
}
