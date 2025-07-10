import Header from '@/components/Header/Header';
import GeolocationChecker from '@/components/GeolocationChecker/GeolocationChecker';

import 'modern-normalize';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GeolocationChecker />
        <Header />
        {children}
      </body>
    </html>
  );
}
