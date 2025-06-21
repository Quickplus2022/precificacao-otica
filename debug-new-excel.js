import XLSX from 'xlsx';

console.log('Analisando estrutura da nova planilha PRECIFICAÇÃO_REAL...');

try {
  const workbook = XLSX.readFile('./attached_assets/PRECIFICAÇÃO_REAL_1750466539640.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  console.log(`Total de linhas: ${data.length}`);
  console.log(`Total de colunas: ${data[0]?.length || 0}`);
  
  console.log('\n=== CABEÇALHOS (primeira linha) ===');
  console.log(data[0]);
  
  console.log('\n=== PRIMEIRAS 5 LINHAS DE DADOS ===');
  for (let i = 1; i <= Math.min(5, data.length - 1); i++) {
    console.log(`Linha ${i}:`, data[i]);
  }
  
  console.log('\n=== PROCURANDO COLUNAS IMPORTANTES ===');
  const headers = data[0];
  headers.forEach((header, index) => {
    if (header && typeof header === 'string') {
      const headerUpper = header.toUpperCase();
      if (headerUpper.includes('NOME') || 
          headerUpper.includes('INCOLOR') || 
          headerUpper.includes('ANTIREFLEXO') || 
          headerUpper.includes('FOTOSENSÍVEL') || 
          headerUpper.includes('BLUE') ||
          headerUpper.includes('PREÇO') ||
          headerUpper.includes('PARCELA')) {
        console.log(`Coluna ${index}: "${header}"`);
      }
    }
  });
  
} catch (error) {
  console.error('Erro ao processar arquivo:', error);
}