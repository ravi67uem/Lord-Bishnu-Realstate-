import './globals.css';
import './compiled.css';

export const metadata = {
  metadataBase: new URL('https://lordbishnubuilder.com'),
  title: 'Lord Bishnu Builder | Verified Plots & Construction Materials Platform',
  description: 'Bihar & Jharkhand’s No.1 Integrated Construction Material & Online Plot Listing and Booking Platform. 100% Clear-Title Plots, Mill-Direct TMT Steel, UltraTech Cement, and Online Token Booking.',
  keywords: 'Lord Bishnu Builder, plots in Gaya, land in Gaya, construction materials Bihar, Tata Tiscon Gaya, UltraTech cement, plot booking online, real estate Gaya, Bodh Gaya plots',
  authors: [{ name: 'Lord Bishnu Builder & Real Estate' }],
  openGraph: {
    title: 'Lord Bishnu Builder | Premium Plots & Construction Materials',
    description: 'One Centralized Platform for Verified Real Estate Plots & Factory-Direct Building Materials.',
    url: 'https://lordbishnubuilder.com',
    siteName: 'Lord Bishnu Builder',
    images: [
      {
        url: '/images/hero-township.jpg',
        width: 1200,
        height: 630,
        alt: 'Lord Bishnu Plotted Townships'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#ea580c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
