import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.safanabbasi.com"),
  title: "Safan Abbasi — Software Engineer",
  description:
    "Full-Stack Software Engineer & NASA Patent Co-Inventor. Building scalable solutions with AI, cloud architecture, and modern web technologies.",
  verification: {
    google: "C7rvR625RScm8kL9IxcgsZLKLz3Jb-icDZsZRFnb2zw",
  },
  openGraph: {
    title: "Safan Abbasi — Software Engineer",
    description:
      "Full-Stack Software Engineer & NASA Patent Co-Inventor. Building scalable solutions with AI, cloud architecture, and modern web technologies.",
    type: "website",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Safan Abbasi",
                  "url": "https://www.safanabbasi.com",
                },
                {
                  "@type": "Person",
                  "name": "Safan Abbasi",
                  "url": "https://www.safanabbasi.com",
                  "jobTitle": "Software Engineer",
                  "description":
                    "Full-Stack Software Engineer & NASA Patent Co-Inventor. Building scalable solutions with AI, cloud architecture, and modern web technologies.",
                  "sameAs": [
                    "https://github.com/SafanAbbasi",
                    "https://linkedin.com/in/safanabbasi",
                  ],
                  "knowsAbout": [
                    "Full-Stack Development",
                    "AI & LLM Systems",
                    "Cloud Architecture",
                    "Python",
                    "C#",
                    ".NET",
                    "React",
                    "TypeScript",
                    "Azure",
                    "AWS",
                    "Docker",
                    "Kubernetes",
                  ],
                  "hasCredential": [
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "AZ-104 Azure Administrator",
                    },
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "AI-900 AI Fundamentals",
                    },
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "AZ-900 Azure Fundamentals",
                    },
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "AWS Cloud Practitioner",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
