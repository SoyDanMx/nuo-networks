import type { SimpleIcon } from "simple-icons";
import { siCisco, siFortinet, siHuawei, siTplink, siUbiquiti } from "simple-icons";

/**
 * Mapa brandId → icono [Simple Icons](https://simpleicons.org) (CC0).
 * Solo incluimos marcas con icono en el paquete; el resto usa wordmark en PartnerBrandLogo.
 */
const PARTNER_SIMPLE_ICON_BY_ID: Record<string, SimpleIcon> = {
  cisco: siCisco,
  fortinet: siFortinet,
  huawei: siHuawei,
  "tp-link": siTplink,
  ubiquiti: siUbiquiti
};

export function getPartnerSimpleIcon(brandId: string): SimpleIcon | null {
  return PARTNER_SIMPLE_ICON_BY_ID[brandId] ?? null;
}
