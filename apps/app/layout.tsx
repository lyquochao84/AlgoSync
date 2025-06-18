// app/layout.tsx
import './globals.css';
import LayoutClientWrapper from '@/components/LayoutClientWrapper/LayoutClientWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlgoSync',
  description: 'AlgoSync',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
