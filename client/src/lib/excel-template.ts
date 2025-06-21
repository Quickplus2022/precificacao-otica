// Template da planilha para download
export const createExcelTemplate = () => {
  // Cabeçalhos exatos que o sistema espera
  const headers = [
    'NOME',
    'INCOLOR', 
    'ANTIREFLEXO',
    'FOTOSENSÍVEL', 
    'BLUE CUT',
    'TIPO',
    'Esp',
    'Medidas',
    'PREÇO A VISTA',
    'PARCELA EM 3X (JUROS)',
    'PARCELA EM 6X (JUROS)', 
    'PARCELA EM 10X (JUROS)',
    'TOTAL EM 3X',
    'TOTAL EM 6X',
    'TOTAL EM 10X'
  ];

  // Exemplos para orientar o preenchimento
  const examples = [
    [
      'LT CR-39',
      'NÃO',
      'SIM', 
      'NÃO',
      'NÃO',
      'VISÃO SIMPLES',
      '1.56',
      'Esf. -6,00 a +4,00 / Cil. -0,25 a -2,00',
      399,
      159.6,
      89.77,
      65.84,
      478.8,
      538.65,
      658.35
    ],
    [
      'LT POLI',
      'SIM',
      'NÃO',
      'NÃO', 
      'NÃO',
      'VISÃO SIMPLES',
      '1.59',
      'Esf. -4,00 a +4,00 / Cil. -0,25 a -2,00',
      499,
      199.6,
      112.27,
      82.34,
      598.8,
      673.65,
      823.35
    ]
  ];

  // Criar CSV (mais simples para download)
  const csvContent = [
    headers.join(','),
    ...examples.map(row => row.join(','))
  ].join('\n');

  return csvContent;
};

export const downloadTemplate = () => {
  const csvContent = createExcelTemplate();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'MODELO_PRECIFICACAO.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const getTemplateInstructions = () => {
  return `
📋 INSTRUÇÕES PARA ATUALIZAR PREÇOS:

1. Baixe o modelo "MODELO_PRECIFICACAO.csv"
2. Abra no Excel ou Google Planilhas
3. Mantenha os cabeçalhos exatamente como estão
4. Preencha as colunas:
   • NOME: Nome da lente
   • INCOLOR: SIM ou NÃO
   • ANTIREFLEXO: SIM ou NÃO  
   • FOTOSENSÍVEL: SIM ou NÃO
   • BLUE CUT: SIM ou NÃO
   • PREÇO A VISTA: Valor numérico (ex: 399)
   • PARCELA EM 3X: Valor da parcela (ex: 159.6)
   • PARCELA EM 6X: Valor da parcela (ex: 89.77)
   • PARCELA EM 10X: Valor da parcela (ex: 65.84)

5. Salve como .xlsx ou .csv
6. Faça upload pelo botão "Atualizar Preços"

⚠️ IMPORTANTE: Use apenas SIM/NÃO nas colunas de características!
  `;
};