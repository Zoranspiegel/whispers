import type { Metadata } from 'next';
import { Baumans } from 'next/font/google';
import './globals.css';

const baumansFont = Baumans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-baumans'
});


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className={`${baumansFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
