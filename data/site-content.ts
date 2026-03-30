import type {
  CyberCapability,
  NavLink,
  Partner,
  Sector,
  Service
} from "@/types/content";

export const navLinks: NavLink[] = [
  { label: "Ciberdefensa", href: "#cyber-defense" },
  { label: "Ecosistema", href: "#ecosystem" },
  { label: "Soluciones", href: "#industrial-solutions" },
  { label: "Contacto Seguro", href: "#secure-contact" }
];

export const cyberCapabilities: CyberCapability[] = [
  {
    title: "Zero Trust Architecture",
    description:
      "Segmentamos activos OT/IT y validamos cada identidad con políticas dinámicas y trazabilidad centralizada.",
    icon: "shield"
  },
  {
    title: "AI-Powered Threat Intelligence (OT/IT)",
    description:
      "Correlación proactiva de eventos para detectar anomalías en infraestructura crítica antes de un impacto operativo.",
    icon: "brain"
  },
  {
    title: "Managed Firewalls",
    description:
      "Gestión continua de perímetros, hardening de reglas y respuesta inmediata orientada a continuidad de negocio.",
    icon: "firewall"
  }
];

export const services: Service[] = [
  {
    id: "cyber-physical-security",
    title: "Cyber-Physical Security",
    description: "CCTV IA, biometría y control de acceso cloud con enfoque preventivo."
  },
  {
    id: "critical-infrastructure",
    title: "Critical Infrastructure",
    description:
      "Data centers, redes de fibra/wireless y energía inteligente para operaciones robustas."
  },
  {
    id: "digital-labs",
    title: "Digital Labs & SaaS",
    description:
      "Aplicaciones Next.js, software a medida y martech para acelerar crecimiento B2B."
  },
  {
    id: "managed-services",
    title: "Managed Services",
    description:
      "Administración de servidores, cloud hosting y outsourcing técnico de alto desempeño."
  }
];

/** Referencia alineada al carrusel i18n (catálogo EPCOM); logoSrc reservado para assets oficiales. */
export const partners: Partner[] = [
  { name: "EPCOM Professional", logoSrc: "/nuo-mark.svg" },
  { name: "Hikvision", logoSrc: "/nuo-mark.svg" },
  { name: "Grandstream", logoSrc: "/nuo-mark.svg" },
  { name: "ZKTeco", logoSrc: "/nuo-mark.svg" }
];

export const sectors: Sector[] = [
  {
    id: "logistica",
    title: "Logistics",
    summary: "Protección de rutas, trazabilidad en tiempo real y continuidad de cadena crítica."
  },
  {
    id: "manufactura",
    title: "Manufacturing",
    summary: "Defensa de líneas OT, monitoreo de activos y control de riesgo operacional."
  },
  {
    id: "corporativo",
    title: "Corporate",
    summary: "Infraestructura digital segura para oficinas inteligentes y trabajo híbrido."
  }
];
