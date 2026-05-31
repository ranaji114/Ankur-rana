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
    default: "Ankur Rana | Author, Independent Researcher, and Thinker",
    template: "%s | Ankur Rana",
  },
  description:
    "The official website of Ankur Rana, author, independent researcher, and thinker exploring time, reality, perception, consciousness, psychology, language, and human understanding.",
  creator: "Ankur Rana",
  publisher: "Ankur Rana",
  authors: [{ name: "Ankur Rana" }],
  category: "Author Website",
  keywords: [
    "Ankur Rana",
    "author",
    "independent researcher",
    "research papers",
    "Zenodo",
    "Kindle books",
    "independent thinker",
    "time",
    "reality",
    "consciousness",
    "psychology",
    "relationships",
    "Awadhi",
    "Hindi poetry",
  ],
  openGraph: {
    title: "Ankur Rana | Author, Independent Researcher, and Thinker",
    description:
      "Books and independent research on time, reality, perception, consciousness, psychology, language, and human understanding.",
    type: "website",
    siteName: "Ankur Rana",
  },
  twitter: {
    card: "summary",
    title: "Ankur Rana | Author, Independent Researcher, and Thinker",
    description:
      "Books and independent research on time, reality, perception, consciousness, psychology, language, and human understanding.",
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
