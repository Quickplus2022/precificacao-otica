import { Lens } from "@shared/schema";

export interface ExcelRow {
  NOME: string;
  INCOLOR: string;
  ANTIREFLEXO: string;
  FOTOSENSÍVEL: string;
  "BLUE CUT": string;
  MEDIDAS: string;
  ESP: string;
  "PREÇO A VISTA": string;
  "PARCELA EM 3X (JUROS)": string;
  "PARCELA EM 6X (JUROS)": string;
  "PARCELA EM 10X (JUROS)": string;
}

export const parseExcelToLenses = (data: ExcelRow[]): Lens[] => {
  return data.map((row, index) => ({
    id: index + 1,
    nome: row.NOME || '',
    incolor: row.INCOLOR?.toLowerCase() === 'sim',
    antireflexo: row.ANTIREFLEXO?.toLowerCase() === 'sim',
    fotosensivel: row.FOTOSENSÍVEL?.toLowerCase() === 'sim',
    blueCut: row["BLUE CUT"]?.toLowerCase() === 'sim',
    medidas: row.MEDIDAS || '',
    espessura: row.ESP || '',
    precoVista: row["PREÇO A VISTA"] || '',
    parcela3x: row["PARCELA EM 3X (JUROS)"] || '',
    parcela6x: row["PARCELA EM 6X (JUROS)"] || '',
    parcela10x: row["PARCELA EM 10X (JUROS)"] || ''
  }));
};

export const saveToLocalStorage = (lenses: Lens[]): void => {
  localStorage.setItem('lens-data', JSON.stringify(lenses));
};

export const loadFromLocalStorage = (): Lens[] | null => {
  const data = localStorage.getItem('lens-data');
  return data ? JSON.parse(data) : null;
};

export const validateExcelFile = (file: File): boolean => {
  return file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
};
