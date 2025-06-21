
import * as XLSX from 'xlsx';
import { Lens } from '@shared/schema';

export interface ExcelData {
  NOME?: string;
  INCOLOR?: string;
  ANTIRREFLEXO?: string;
  FOTOSENSÍVEL?: string;
  "BLUE CUT"?: string;
  MEDIDAS?: string;
  ESF?: string;
  CIL?: string;
  ESP?: string;
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

    // Convert to JSON with header row
    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
    }) as string[][];

    if (data.length < 2) {
      throw new Error('Arquivo Excel deve ter pelo menos cabeçalho e uma linha de dados');
    }

    const header = data[0];
    const rows = data.slice(1);

    const jsonData: ExcelData[] = rows.map((row) => {
      const rowData: ExcelData = {};

      header.forEach((key, i) => {
        const valor = row[i]?.toString().trim().toUpperCase();

        if (key === 'ANTIRREFLEXO') {
          rowData[key] = 'SIM'; // Sempre SIM
        } else if (key === 'FOTOSENSÍVEL') {
          rowData[key] = valor === 'SIM' ? 'SIM' : 'NÃO'; // conforme planilha
        } else {
          rowData[key] = row[i]?.toString().trim();
        }
      });

      return rowData;
    });

    return jsonData;
  } catch (error) {
    throw new Error(`Erro ao ler o arquivo Excel: ${error}`);
  }
};
