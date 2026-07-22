import './globals.css';
import { Inter, Source_Serif_4 } from 'next/font/google';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.cleophis.com'),
  title: 'Cleophis — Private, Offline AI Tutoring on Any Device',
  description:
    'A growing library of fine-tuned, on-device AI models — a full academic tutor for $10/month that works 100% offline, with data that never leaves the device.',
  openGraph: {
    title: 'Cleophis — Private, Offline AI Tutoring on Any Device',
    description:
      'A full academic tutor for $10/month that works 100% offline, with data that never leaves the device.',
    url: 'https://www.cleophis.com',
    siteName: 'Cleophis',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cleophis — Private, Offline AI Tutoring on Any Device',
    description:
      'A full academic tutor for $10/month that works 100% offline, with data that never leaves the device.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
