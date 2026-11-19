import { Inter, Source_Serif_4 } from 'next/font/google';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.cleophis.com'),
  title: 'Cleophis — A Private Tutor That Lives on Your Device',
  description:
    'A patient AI tutor for your kid — downloaded, not streamed. Sign in once; tutoring works fully offline, and every conversation stays on your device. $10/month.',
  openGraph: {
    title: 'Cleophis — A Private Tutor That Lives on Your Device',
    description:
      'A patient AI tutor that runs on your device — tutoring works fully offline, and every conversation stays at home. $10/month.',
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
