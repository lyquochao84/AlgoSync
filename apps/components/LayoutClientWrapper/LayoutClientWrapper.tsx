"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/onboarding");

  return (
    <div className="page-wrapper">
      {!hideLayout && <Navigation />}

      {!hideLayout ? (
        <div className="content-wrapper">{children}</div>
      ) : (
        children
      )}

      {!hideLayout && <Footer />}
    </div>
  );
}
