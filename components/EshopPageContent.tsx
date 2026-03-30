"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { EshopCartProvider } from "@/components/eshop/EshopCartContext";
import { EshopStorefront } from "@/components/eshop/EshopStorefront";

const EshopPageContent = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main className="relative overflow-hidden border-b border-cyan-500/10" id="main">
        <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-[0.07]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(187_86%_53%/0.12),transparent_50%)]"
          aria-hidden
        />
        <EshopCartProvider>
          <EshopStorefront />
        </EshopCartProvider>
      </main>
      <Footer />
    </div>
  );
};

export default EshopPageContent;
