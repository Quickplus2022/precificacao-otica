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
    let medidas = null;
    let esf = null;
    let cil = null;
    
    if (row.ESF && row.CIL) {
      // Se tem ESF e CIL separados, usar esses valores
      esf = row.ESF;
      cil = row.CIL;
      medidas = `ESF: ${row.ESF}, CIL: ${row.CIL}`;
    } else if (row.MEDIDAS) {
      // Se tem apenas MEDIDAS, usar esse valor
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
      esf: esf,
      cil: cil,
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
  
  const response = await fetch('/api/upload-excel', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Erro ao fazer upload do arquivo');
  }
  
  const result = await response.json();
  return result.data;
};

export const getAvailableOptions = async (lensData: Lens[], currentFilters: Record<string, any>) => {
  try {
    const response = await fetch('/api/available-options', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lensData,
        currentFilters
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao obter opções disponíveis');
    }
    
    return await response.json();
  } catch (error) {
    // Fallback para processamento local
    return getLocalAvailableOptions(lensData, currentFilters);
  }
};

export const getLocalAvailableOptions = (data: Lens[], currentFilters: Record<string, any>) => {
  const filteredData = data.filter(lens => {
    return Object.entries(currentFilters).every(([key, value]) => {
      if (value === undefined || value === null) return true;
      return lens[key as keyof Lens] === value;
    });
  });
  
  const medidasArray = filteredData.map(lens => lens.medidas).filter(Boolean) as string[];
  const esfArray = filteredData.map(lens => lens.esf).filter(Boolean) as string[];
  const cilArray = filteredData.map(lens => lens.cil).filter(Boolean) as string[];
  const espessurasArray = filteredData.map(lens => lens.espessura).filter(Boolean);
  
  const uniqueMedidas = medidasArray.filter((value, index, self) => self.indexOf(value) === index);
  const uniqueEsf = esfArray.filter((value, index, self) => self.indexOf(value) === index);
  const uniqueCil = cilArray.filter((value, index, self) => self.indexOf(value) === index);
  const uniqueEspessuras = espessurasArray.filter((value, index, self) => self.indexOf(value) === index);
  
  return {
    medidas: uniqueMedidas.sort(),
    esf: uniqueEsf.sort(),
    cil: uniqueCil.sort(),
    espessuras: uniqueEspessuras.sort(),
    count: filteredData.length,
    hasEsfCil: uniqueEsf.length > 0 || uniqueCil.length > 0
  };
};

export const validateExcelFile = (file: File): boolean => {
  return file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
};
