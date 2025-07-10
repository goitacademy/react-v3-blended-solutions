import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
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
        <TanStackProvider>
          <GeolocationChecker />
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
