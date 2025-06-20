import { Lens } from "@shared/schema";
import { apiRequest } from "./queryClient";

export interface ExcelRow {
  NOME: string;
  INCOLOR: string;
  ANTIREFLEXO: string;
  FOTOSENSÍVEL: string;
  "BLUE CUT": string;
  MEDIDAS?: string;
  ESF?: string;
  CIL?: string;
  ESP: string;
  "PREÇO A VISTA": string;
  "PARCELA EM 3X (JUROS)": string;
  "PARCELA EM 6X (JUROS)": string;
  "PARCELA EM 10X (JUROS)": string;
}

export const parseExcelToLenses = (data: ExcelRow[]): Lens[] => {
  return data.map((row, index) => {
    // Verificar se tem colunas ESF e CIL separadas ou usar MEDIDAS
    let medidas = '';
    if (row.ESF && row.CIL) {
      medidas = `ESF: ${row.ESF}, CIL: ${row.CIL}`;
    } else if (row.MEDIDAS) {
      medidas = row.MEDIDAS;
    }

    return {
      id: index + 1,
      nome: row.NOME || '',
      incolor: row.INCOLOR?.toLowerCase() === 'sim',
      antireflexo: row.ANTIREFLEXO?.toLowerCase() === 'sim',
      fotosensivel: row.FOTOSENSÍVEL?.toLowerCase() === 'sim',
      blueCut: row["BLUE CUT"]?.toLowerCase() === 'sim',
      medidas: medidas,
      espessura: row.ESP || '',
      precoVista: row["PREÇO A VISTA"] || '',
      parcela3x: row["PARCELA EM 3X (JUROS)"] || '',
      parcela6x: row["PARCELA EM 6X (JUROS)"] || '',
      parcela10x: row["PARCELA EM 10X (JUROS)"] || ''
    };
  });
};

export const saveToLocalStorage = (lenses: Lens[]): void => {
  localStorage.setItem('lens-data', JSON.stringify(lenses));
};

export const loadFromLocalStorage = (): Lens[] | null => {
  const data = localStorage.getItem('lens-data');
  return data ? JSON.parse(data) : null;
};

export const uploadExcelFile = async (file: File): Promise<Lens[]> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiRequest('/api/upload-excel', {
    method: 'POST',
    body: formData,
  });
  
  return response.data;
};

export const getAvailableOptions = async (lensData: Lens[], currentFilters: Record<string, any>) => {
  const response = await apiRequest('/api/available-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lensData,
      currentFilters
    }),
  });
  
  return response;
};

export const validateExcelFile = (file: File): boolean => {
  return file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
};
