import * as XLSX from 'xlsx';
import { Lens } from '@shared/schema';

export interface ExcelData {
  NOME?: string;
  INCOLOR?: string;
  ANTIREFLEXO?: string;
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
      defval: ''
    }) as string[][];
    
    if (data.length < 2) {
      throw new Error('Arquivo Excel deve ter pelo menos cabeçalho e uma linha de dados');
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    return rows.map(row => {
      const obj: ExcelData = {};
      headers.forEach((header, index) => {
        if (header && row[index] !== undefined) {
          obj[header as keyof ExcelData] = String(row[index]).trim();
        }
      });
      return obj;
    }).filter(row => row.NOME && row.NOME.trim() !== '');
    
  } catch (error) {
    console.error('Erro ao ler arquivo Excel:', error);
    throw new Error('Erro ao processar arquivo Excel');
  }
};

export const parseExcelDataToLenses = (data: ExcelData[]): Lens[] => {
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

export const getAvailableOptions = (data: Lens[], currentFilters: Record<string, any>) => {
  // Filtrar dados baseado nos filtros atuais
  const filteredData = data.filter(lens => {
    return Object.entries(currentFilters).every(([key, value]) => {
      if (value === undefined || value === null) return true;
      return lens[key as keyof Lens] === value;
    });
  });
  
  // Extrair opções únicas dos dados filtrados
  const medidasArray = filteredData.map(lens => lens.medidas).filter(Boolean) as string[];
  const esfArray = filteredData.map(lens => lens.esf).filter(Boolean) as string[];
  const cilArray = filteredData.map(lens => lens.cil).filter(Boolean) as string[];
  const espessurasArray = filteredData.map(lens => lens.espessura).filter(Boolean);
  
  // Remover duplicatas manualmente
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