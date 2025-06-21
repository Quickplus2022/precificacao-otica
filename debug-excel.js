import XLSX from 'xlsx';
import fs from 'fs';

// Ler o arquivo Excel
const filePath = './attached_assets/PRECIFICAÇÃO_1750462873705.xlsx';

if (fs.existsSync(filePath)) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Converter para JSON para ver os dados
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log('=== CABEÇALHOS (primeira linha) ===');
  console.log(data[0]);
  
  console.log('\n=== PRIMEIRA LINHA DE DADOS ===');
  console.log(data[1]);
  
  console.log('\n=== SEGUNDA LINHA DE DADOS ===');
  console.log(data[2]);
  
  console.log('\n=== TERCEIRA LINHA DE DADOS ===');
  console.log(data[3]);
  
  console.log('\n=== VERIFICANDO COMBINAÇÕES INCOLOR=SIM ===');
  for (let i = 1; i < Math.min(20, data.length); i++) {
    const row = data[i];
    if (row && row[5] === 'SIM') {
      console.log(`Linha ${i}: INCOLOR=${row[5]}, ANTIREFLEXO=${row[6]}, FOTOSENSÍVEL=${row[7]}, BLUE_CUT=${row[8]}, ESP=${row[10]}, MEDIDAS=${row[11]}`);
    }
  }
  
  console.log('\n=== PRIMEIRAS 10 LINHAS DE DADOS FORMATADAS ===');
  for (let i = 1; i <= Math.min(10, data.length - 1); i++) {
    const row = data[i];
    if (row && row.length > 22) {
      console.log(`Linha ${i}:`);
      console.log(`  NOME: ${row[4]}`);
      console.log(`  INCOLOR: ${row[5]}`);
      console.log(`  ANTIREFLEXO: ${row[6]}`);
      console.log(`  FOTOSENSÍVEL: ${row[7]}`);
      console.log(`  BLUE CUT: ${row[8]}`);
      console.log(`  ESPESSURA: ${row[10]}`);
      console.log(`  MEDIDAS: ${row[11]}`);
      console.log(`  PREÇO A VISTA: ${row[13]}`);
      console.log(`  PARCELA 3X: ${row[20]}`);
      console.log(`  PARCELA 6X: ${row[21]}`);
      console.log(`  PARCELA 10X: ${row[22]}`);
      console.log('---');
    }
  }
  
} else {
  console.log('Arquivo não encontrado:', filePath);
}