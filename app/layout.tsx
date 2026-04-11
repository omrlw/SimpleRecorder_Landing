import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Simple Recorder | The Premium 120fps Screen Recorder',
  description: 'Capture your screen with zero friction. Simple Recorder offers 120fps recording, custom regions, and studio-quality audio in a beautifully designed, lightweight app.',
  keywords: ['screen recorder', '120fps recording', 'screen capture', 'video recording software', 'premium screen recorder'],
  openGraph: {
    title: 'Simple Recorder | The Premium 120fps Screen Recorder',
    description: 'Capture your screen with zero friction. Simple Recorder offers 120fps recording, custom regions, and studio-quality audio.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="font-sans antialiased text-[#262626] bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
