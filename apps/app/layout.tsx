import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

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
        <div className='page-wrapper'>
          <Navigation />
          <div className='content-wrapper'>
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
