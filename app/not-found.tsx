import type { Metadata, Route } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: `404 · ${SITE_NAME}`,
  description: "La página solicitada no existe en nuo-networks.com.",
  robots: {
    index: false,
    follow: true
  }
};

export default function NotFound(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="nuo-card w-full max-w-xl p-10 text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-primary">Error 404</p>
        <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ruta no encontrada</h1>
        <p className="mb-8 text-muted-foreground">
          La pagina que buscas no existe o fue movida dentro de la arquitectura actual.
        </p>
        <Link
          href={"/" as Route}
          className="inline-flex items-center justify-center rounded-xl border border-primary bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-nuo-cyan transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
