import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";

export const metadata: Metadata = {
  title: "AlgoSync",
  description: "AlgoSync",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
