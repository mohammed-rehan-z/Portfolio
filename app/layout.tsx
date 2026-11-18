import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammedrehan.dev"),
  title: "Mohammed Rehan Z · AI Engineer & Innovator",
  description:
    "Building innovative AI projects, in-browser WebAssembly applications, edge computer vision tools, and modern web platforms. B.Tech candidate in AI & ML at HKBK College of Engineering, Bengaluru.",
  keywords: [
    "Mohammed Rehan Z",
    "AI Engineer & Innovator",
    "AI Projects",
    "Web Innovation",
    "Machine Learning",
    "WebAssembly",
    "WASM Edge Inference",
    "Local RAG",
    "Transformers.js",
    "Python",
    "OpenCV",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Mohammed Rehan Z", url: "https://github.com/mohammed-rehan-z" }],
  creator: "Mohammed Rehan Z",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammedrehan.dev",
    title: "Mohammed Rehan Z · AI Engineer & Innovator",
    description:
      "Building innovative AI projects, in-browser WebAssembly tools, edge computer vision applications, and full-stack web solutions.",
    siteName: "Mohammed Rehan Z Portfolio",
    images: [
      {
        url: "/images/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Rehan Z · AI Engineer & Innovator Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Rehan Z · AI Engineer & Innovator",
    description:
      "Innovative AI projects, in-browser WebAssembly tools, edge computer vision applications, and full-stack web solutions.",
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070b14] font-body-md text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen dark">
        {children}
      </body>
    </html>
  );
}
