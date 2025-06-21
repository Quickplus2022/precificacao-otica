import { Lens } from "@shared/schema";

// Dados reais extraídos da planilha PRECIFICAÇÃO
export const defaultLensData: Lens[] = [
  {
    id: 1,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: false, // "NÃO"
    blueCut: false, // "NÃO"
    medidas: "Esf. -6,00 a +4,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 399,00",
    parcela3x: "R$ 159,60",
    parcela6x: "R$ 89,77",
    parcela10x: "R$ 65,84"
  },
  {
    id: 2,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: false, // "NÃO"
    blueCut: false, // "NÃO"
    medidas: "Esf. -6,00 a +6,00 / Cil. -2,25 a -4,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 499,00",
    parcela3x: "R$ 199,60",
    parcela6x: "R$ 112,27",
    parcela10x: "R$ 82,34"
  },
  {
    id: 3,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: false, // "NÃO"
    blueCut: false, // "NÃO"
    medidas: "Esf. -4,00 a +4,00 / Cil. -4,25 a -6,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 599,00",
    parcela3x: "R$ 239,60",
    parcela6x: "R$ 134,78",
    parcela10x: "R$ 98,84"
  },
  {
    id: 4,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: true, // "SIM"
    blueCut: false, // "NÃO"
    medidas: "Esf. -4,00 a +4,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 499,00",
    parcela3x: "R$ 199,60",
    parcela6x: "R$ 112,27",
    parcela10x: "R$ 82,34"
  },
  {
    id: 5,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: false, // "NÃO"
    blueCut: true, // "SIM"
    medidas: "Esf. -4,00 a +4,00 / Cil. -2,25 a -4,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 599,00",
    parcela3x: "R$ 239,60",
    parcela6x: "R$ 134,78",
    parcela10x: "R$ 98,84"
  },
  {
    id: 6,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: true, // "SIM"
    blueCut: true, // "SIM"
    medidas: "Esf. -4,00 a +2,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 699,00",
    parcela3x: "R$ 279,60",
    parcela6x: "R$ 157,28",
    parcela10x: "R$ 115,34"
  },
  {
    id: 7,
    nome: "LT CR-39",
    incolor: false, // "NÃO"
    antireflexo: true, // "SIM"
    fotosensivel: true, // "SIM"
    blueCut: true, // "SIM"
    medidas: "Esf. -4,00 a +2,00 / Cil. -2,25 a -4,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 799,00",
    parcela3x: "R$ 319,60",
    parcela6x: "R$ 179,78",
    parcela10x: "R$ 131,84"
  },
  {
    id: 8,
    nome: "LT POLI",
    incolor: true, // "SIM"
    antireflexo: false, // "NÃO"
    fotosensivel: false, // "NÃO"
    blueCut: false, // "NÃO"
    medidas: "Esf. -4,00 a +4,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.59",
    precoVista: "R$ 499,00",
    parcela3x: "R$ 199,60",
    parcela6x: "R$ 112,27",
    parcela10x: "R$ 82,34"
  }
];

export const questions = [
  {
    text: "É incolor?",
    key: "incolor" as const,
    options: [
      { label: "Sim", value: true },
      { label: "Não", value: false }
    ]
  },
  {
    text: "Tem antirreflexo?",
    key: "antireflexo" as const,
    options: [
      { label: "Sim", value: true },
      { label: "Não", value: false }
    ]
  },
  {
    text: "É fotosensível?",
    key: "fotosensivel" as const,
    options: [
      { label: "Sim", value: true },
      { label: "Não", value: false }
    ]
  },
  {
    text: "Tem blue cut?",
    key: "blueCut" as const,
    options: [
      { label: "Sim", value: true },
      { label: "Não", value: false }
    ]
  },
  {
    text: "Qual a faixa de grau?",
    key: "medidas" as const,
    options: [
      { label: "-1.00 a +1.00", value: "-1.00 a +1.00" },
      { label: "-2.00 a +2.00", value: "-2.00 a +2.00" },
      { label: "-4.00 a +4.00", value: "-4.00 a +4.00" },
      { label: "-6.00 a +6.00", value: "-6.00 a +6.00" }
    ]
  },
  {
    text: "Qual a espessura?",
    key: "espessura" as const,
    options: [
      { label: "1.50", value: "1.50" },
      { label: "1.67", value: "1.67" },
      { label: "1.74", value: "1.74" }
    ]
  }
];

export const getQuestionLabel = (key: string): string => {
  const labels: Record<string, string> = {
    'incolor': 'É INCOLOR',
    'antireflexo': 'TEM ANTIREFLEXO',
    'fotosensivel': 'É FOTOSENSÍVEL',
    'blueCut': 'TEM BLUE CUT',
    'medidas': 'EM QUAL FAIXA ESTÁ O GRAU',
    'espessura': 'QUAL A ESPESSURA'
  };
  return labels[key] || key;
};
