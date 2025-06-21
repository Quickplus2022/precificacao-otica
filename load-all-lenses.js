import XLSX from 'xlsx';

console.log('Carregando todas as 82 lentes da planilha...');

try {
  const workbook = XLSX.readFile('./attached_assets/PRECIFICAÇÃO_1750462873705.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  console.log(`Total de linhas na planilha: ${data.length}`);
  console.log('Gerando array completo de lentes...\n');

  const lenses = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row && row.length > 11) {
      const lens = {
        id: i,
        nome: row[4] || 'Lente',
        incolor: row[5] === 'SIM',
        antireflexo: row[6] === 'SIM',
        fotosensivel: row[7] === 'SIM',
        blueCut: row[8] === 'SIM',
        medidas: row[11] || null,
        esf: null,
        cil: null,
        espessura: row[10] || '',
        precoVista: `R$ ${parseFloat(row[13]).toFixed(2).replace('.', ',')}`,
        parcela3x: `R$ ${parseFloat(row[20]).toFixed(2).replace('.', ',')}`,
        parcela6x: `R$ ${parseFloat(row[21]).toFixed(2).replace('.', ',')}`,
        parcela10x: `R$ ${parseFloat(row[22]).toFixed(2).replace('.', ',')}`
      };
      lenses.push(lens);
    }
  }

  console.log(`export const defaultLensData: Lens[] = ${JSON.stringify(lenses, null, 2)};`);
  
} catch (error) {
  console.error('Erro ao processar arquivo:', error);
}