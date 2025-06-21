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
  
  console.log('\n=== PRIMEIRAS 5 LINHAS COMPLETAS ===');
  for (let i = 0; i < Math.min(5, data.length); i++) {
    console.log(`Linha ${i}:`, data[i]);
  }
  
} else {
  console.log('Arquivo não encontrado:', filePath);
}