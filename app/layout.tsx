import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammedrehan.dev"),
  title: "Mohammed Rehan.Z — Monochrome Paper & Ink Portfolio",
  description:
    "AI Systems & Full-Stack Web Engineer. Building impactful, innovative AI projects and real-world web solutions. 1st Prize Project Expo winner and creator of LocalResearcher.",
  keywords: [
    "Mohammed Rehan Z",
    "Mohammed Rehan.Z",
    "AI Systems Engineer",
    "Full-Stack Web Engineer",
    "LocalResearcher",
    "In-Browser RAG",
    "WebAssembly",
    "Machine Learning",
    "Next.js",
    "TypeScript",
    "HKBK College of Engineering",
  ],
  authors: [{ name: "Mohammed Rehan.Z", url: "https://github.com/mohammed-rehan-z" }],
  creator: "Mohammed Rehan.Z",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammedrehan.dev",
    title: "Mohammed Rehan.Z — Monochrome Paper & Ink Portfolio",
    description:
      "AI Systems & Full-Stack Web Engineer. Building impactful, innovative AI projects and real-world web solutions.",
    siteName: "Mohammed Rehan.Z Portfolio",
    images: [
      {
        url: "/images/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Rehan.Z Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Rehan.Z — Monochrome Paper & Ink Portfolio",
    description:
      "AI Systems & Full-Stack Web Engineer. Building impactful, innovative AI projects and real-world web solutions.",
    images: ["/images/portfolio-preview.png"],
    creator: "@mohammedrehanz",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-50 dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 antialiased min-h-screen relative overflow-x-hidden transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
