import XLSX from 'xlsx';

// Ler o arquivo Excel
const workbook = XLSX.readFile('attached_assets/PRECIFICAÇÃO_REAL_1750466539640.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Converter para JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Extrair tipos únicos de visão
const tiposUnicos = [...new Set(data.map(item => item.TIPO))];
console.log('Tipos de visão encontrados:');
tiposUnicos.forEach(tipo => console.log(`- ${tipo}`));

// Contar por tipo
console.log('\nContagem por tipo:');
const contagem = {};
data.forEach(item => {
    contagem[item.TIPO] = (contagem[item.TIPO] || 0) + 1;
});
Object.entries(contagem).forEach(([tipo, count]) => {
    console.log(`${tipo}: ${count} lentes`);
});

// Gerar dados atualizados para o sistema
console.log('\n=== DADOS PARA ATUALIZAR O SISTEMA ===');
const lensDataAtualizado = data.map((item, index) => {
    const formatPrice = (price) => `R$ ${price.toFixed(2).replace('.', ',')}`;
    
    return {
        id: index + 1,
        nome: item.NOME,
        incolor: item.INCOLOR === 'SIM',
        antireflexo: item.ANTIREFLEXO === 'SIM', 
        fotosensivel: item.FOTOSENSÍVEL === 'SIM',
        blueCut: item['BLUE CUT'] === 'SIM',
        tipo: item.TIPO,
        medidas: item.Medidas,
        espessura: item.Esp,
        precoVista: formatPrice(item[' PREÇO A VISTA ']),
        parcela3x: formatPrice(item[' PARCELA EM 3X (JUROS) ']),
        parcela6x: formatPrice(item[' PARCELA EM 6X (JUROS) ']),
        parcela10x: formatPrice(item[' PARCELA EM 10X (JUROS) '])
    };
});

console.log(JSON.stringify(lensDataAtualizado.slice(0, 3), null, 2));