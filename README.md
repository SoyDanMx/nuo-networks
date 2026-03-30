# NUO Networks - Corporate Landing

Landing page corporativa de **NUO Networks**, enfocada en conversión B2B para servicios de:

- Ciberseguridad industrial (OT/IT)
- Infraestructura crítica
- Soluciones digitales y SaaS

Diseñada con identidad visual **"The Neon Shield"**: estética high-tech premium, paleta neón controlada y enfoque de resiliencia digital.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript** (Strict Mode)
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **React Hook Form + Zod** (preparado para formularios)

## Identidad Visual

Paleta principal aplicada en el proyecto:

- Base Background: `#020617`
- Primary Accent (Neon Cyan): `#06b6d4`
- Secondary Accent (Magenta): `#d946ef`
- Borders / Grid (Dark Slate): `#1e293b`

## Estado Actual (MVP Base)

Actualmente el proyecto ya incluye:

- Estructura base de Next.js con App Router
- SEO inicial con Metadata API en `app/layout.tsx`
- Navegación principal estilo glassmorphism
- Hero section con animaciones y CTAs
- Sección **Cyber-Defense** con 3 pilares:
  - Zero Trust Architecture
  - AI-Powered Threat Intelligence (OT/IT)
  - Managed Firewalls
- Tipado estricto para estructuras de contenido:
  - `Service`
  - `Partner`
  - `Sector`

## Estructura del Proyecto

```bash
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── cyber-defense-section.tsx
│   ├── hero-section.tsx
│   └── navbar.tsx
├── data/
│   └── site-content.ts
├── public/
│   └── nuo-mark.svg
├── types/
│   └── content.ts
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Desarrollo Local

### 1) Instalar dependencias

```bash
npm install
```

### 2) Ejecutar en modo desarrollo

```bash
npm run dev
```

### 3) Validar calidad y build

```bash
npm run typecheck
npm run lint
npm run build
```

## Scripts Disponibles

- `npm run dev` - Levanta servidor local en desarrollo
- `npm run build` - Genera build de producción
- `npm run start` - Levanta build de producción
- `npm run lint` - Ejecuta ESLint
- `npm run typecheck` - Verifica tipos TypeScript

## Roadmap Inmediato

- [ ] Business Ecosystem (Bento Grid de 4 pilares)
- [ ] Industrial Solutions (horizontal scroll por sectores)
- [ ] Partners logo slider (monocromático + hover dinámico)
- [ ] Secure Contact form (React Hook Form + Zod)
- [ ] Optimización visual adicional para Vercel deployment

## Deployment

Proyecto optimizado para desplegarse en **Vercel**.

Flujo recomendado:

1. Conectar repositorio en Vercel
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Output: configuración por defecto de Next.js

## Repositorio

- GitHub: [SoyDanMx/nuo-networks](https://github.com/SoyDanMx/nuo-networks)

