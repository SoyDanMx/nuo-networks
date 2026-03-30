export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface CyberCapability {
  title: string;
  description: string;
  icon: "shield" | "brain" | "firewall";
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  logoSrc: string;
}

export interface Sector {
  id: "logistica" | "manufactura" | "corporativo";
  title: string;
  summary: string;
}
