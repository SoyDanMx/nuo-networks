import { ESHOP_DEPARTMENTS } from "@/data/eshop-catalog";

export interface EshopCatalogRow {
  /** Stable id for cart + React keys */
  id: string;
  deptId: string;
  line: string;
  lineIndex: number;
}

function stableRowId(deptId: string, lineIndex: number, line: string): string {
  return `${deptId}:${lineIndex}:${line}`;
}

/** Flat catalog rows for grid, search, and quote cart. */
export function getEshopCatalogRows(): EshopCatalogRow[] {
  const rows: EshopCatalogRow[] = [];
  for (const dept of ESHOP_DEPARTMENTS) {
    dept.lines.forEach((line, lineIndex) => {
      rows.push({
        id: stableRowId(dept.id, lineIndex, line),
        deptId: dept.id,
        line,
        lineIndex
      });
    });
  }
  return rows;
}
