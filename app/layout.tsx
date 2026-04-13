import type {Metadata} from 'next';
import './globals.css';

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
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased text-[#262626] bg-[#F8FAFC]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
