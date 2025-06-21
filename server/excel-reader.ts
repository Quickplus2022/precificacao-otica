
import * as XLSX from 'xlsx';
import { Lens } from '@shared/schema';

export interface ExcelData {
  NOME?: string;
  INCOLOR?: string;
  ANTIRREFLEXO?: string;
  FOTOSENSÍVEL?: string;
  "BLUE CUT"?: string;
  MEDIDAS?: string;
  ESP?: string;
  ESF?: string;
  CIL?: string;
  ESP2?: string;
  "PREÇO A VISTA"?: string;
  "PARCELA EM 3X (JUROS)"?: string;
  "PARCELA EM 6X (JUROS)"?: string;
  "PARCELA EM 10X (JUROS)"?: string;
}

export const readExcelFile = (buffer: Buffer): ExcelData[] => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
    }) as string[][];

    if (data.length < 2) {
      throw new Error('Arquivo Excel deve ter pelo menos cabeçalho e uma linha de dados');
    }

    const [header, ...rows] = data;

    return rows.map((row) =>
      header.reduce((obj, key, index) => {
        obj[key] = row[index];
        return obj;
      }, {} as ExcelData)
    );
  } catch (error) {
    console.error('Erro ao ler o Excel:', error);
    throw error;
  }
};

export const parseExcelDataToLenses = (data: ExcelData[]): Lens[] => {
  return data.map((row) => ({
    name: row.NOME || '',
    incolor: row.INCOLOR === 'SIM',
    antirreflexo: row.ANTIRREFLEXO === 'SIM',
    fotosensivel: row.FOTOSENSÍVEL === 'SIM',
    blueCut: row["BLUE CUT"] === 'SIM',
    medidas: row.MEDIDAS || '',
    espessura: row.ESP || '',
    preco: row["PREÇO A VISTA"] || '',
    parcela3x: row["PARCELA EM 3X (JUROS)"] || '',
    parcela6x: row["PARCELA EM 6X (JUROS)"] || '',
    parcela10x: row["PARCELA EM 10X (JUROS)"] || '',
  }));
};

export const getAvailableOptions = (lenses: Lens[]) => {
  const options = {
    incolor: new Set<string>(),
    antirreflexo: new Set<string>(),
    fotosensivel: new Set<string>(),
    blueCut: new Set<string>(),
  };

  for (const lens of lenses) {
    if (lens.incolor !== undefined) options.incolor.add(lens.incolor ? 'SIM' : 'NÃO');
    if (lens.antirreflexo !== undefined) options.antirreflexo.add(lens.antirreflexo ? 'SIM' : 'NÃO');
    if (lens.fotosensivel !== undefined) options.fotosensivel.add(lens.fotosensivel ? 'SIM' : 'NÃO');
    if (lens.blueCut !== undefined) options.blueCut.add(lens.blueCut ? 'SIM' : 'NÃO');
  }

  return {
    incolor: Array.from(options.incolor),
    antirreflexo: Array.from(options.antirreflexo),
    fotosensivel: Array.from(options.fotosensivel),
    blueCut: Array.from(options.blueCut),
  };
};
