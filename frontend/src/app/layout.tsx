import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDBI AI OneBank — The Unified Intelligent Banking Platform",
  description:
    "One AI Platform. Every Banking Decision. AI-powered wealth management, fraud detection, MSME health scoring, and intelligent banking services by IDBI Bank.",
  keywords: [
    "IDBI Bank",
    "AI Banking",
    "Digital Wealth Management",
    "MSME",
    "Fraud Detection",
    "OneBank",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
