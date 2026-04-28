import type {Metadata} from 'next';
import {siteDescription, siteName, siteUrl} from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Simple Recorder | The Premium 120fps Screen Recorder',
  description: siteDescription,
  keywords: ['screen recorder', '120fps recording', 'screen capture', 'video recording software', 'premium screen recorder'],
  applicationName: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Simple Recorder | The Premium 120fps Screen Recorder',
    description: 'Capture your screen with zero friction. Simple Recorder offers 120fps recording, custom regions, and studio-quality audio.',
    url: '/',
    siteName,
    type: 'website',
    images: [
      {
        url: '/images/background-window1.webp',
        width: 1200,
        height: 630,
        alt: 'Simple Recorder screen capture preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Recorder | The Premium 120fps Screen Recorder',
    description: 'Capture your screen with zero friction. Simple Recorder offers 120fps recording, custom regions, and studio-quality audio.',
    images: ['/images/background-window1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/fonts/GoogleSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased text-[#262626] bg-[#F8FAFC]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
