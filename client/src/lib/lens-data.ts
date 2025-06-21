import { Lens } from "@shared/schema";

// Dados baseados no exemplo do Power BI
export const defaultLensData: Lens[] = [
  {
    id: 1,
    nome: "LT CR-39",
    incolor: false,
    antireflexo: true,
    fotosensivel: false,
    blueCut: false,
    medidas: "Esf. -6,00 a +4,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 399,00",
    parcela3x: "R$ 159,60",
    parcela6x: "R$ 89,78",
    parcela10x: "R$ 65,84"
  },
  {
    id: 2,
    nome: "LT CR-39",
    incolor: true,
    antireflexo: false,
    fotosensivel: false,
    blueCut: false,
    medidas: "Esf. -6,00 a +4,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 89,78",
    parcela3x: "R$ 33,00",
    parcela6x: "R$ 18,50",
    parcela10x: "R$ 12,40"
  },
  {
    id: 3,
    nome: "LT CR-39",
    incolor: false,
    antireflexo: false,
    fotosensivel: false,
    blueCut: false,
    medidas: "Esf. -4,00 a +4,00 / Cil. -4,25 a -6,00",
    esf: null,
    cil: null,
    espessura: "1.56",
    precoVista: "R$ 150,00",
    parcela3x: "R$ 55,00",
    parcela6x: "R$ 30,80",
    parcela10x: "R$ 20,50"
  },
  {
    id: 4,
    nome: "LT CR-39",
    incolor: false,
    antireflexo: true,
    fotosensivel: false,
    blueCut: false,
    medidas: "Esf. -4,00 a +2,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.59",
    precoVista: "R$ 280,00",
    parcela3x: "R$ 105,00",
    parcela6x: "R$ 58,90",
    parcela10x: "R$ 39,20"
  },
  {
    id: 5,
    nome: "LT CR-39",
    incolor: false,
    antireflexo: true,
    fotosensivel: false,
    blueCut: false,
    medidas: "Esf. -2,00 a +3,00 / Cil. -2,25 a -4,00",
    esf: null,
    cil: null,
    espessura: "1.59",
    precoVista: "R$ 320,00",
    parcela3x: "R$ 120,00",
    parcela6x: "R$ 67,50",
    parcela10x: "R$ 45,00"
  },
  {
    id: 6,
    nome: "LT CR-39",
    incolor: true,
    antireflexo: true,
    fotosensivel: false,
    blueCut: false,
    medidas: "Esf. -10,00 a +7,00 / Cil. -4,00",
    esf: null,
    cil: null,
    espessura: "1.61",
    precoVista: "R$ 540,00",
    parcela3x: "R$ 205,00",
    parcela6x: "R$ 115,20",
    parcela10x: "R$ 76,80"
  },
  {
    id: 7,
    nome: "LT CR-39",
    incolor: false,
    antireflexo: false,
    fotosensivel: true,
    blueCut: false,
    medidas: "Esf. -1,00 a +1,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.50",
    precoVista: "R$ 210,00",
    parcela3x: "R$ 78,00",
    parcela6x: "R$ 43,50",
    parcela10x: "R$ 29,00"
  },
  {
    id: 8,
    nome: "LT CR-39",
    incolor: true,
    antireflexo: true,
    fotosensivel: true,
    blueCut: true,
    medidas: "Esf. -4,00 a +4,00 / Cil. -0,25 a -2,00",
    esf: null,
    cil: null,
    espessura: "1.67",
    precoVista: "R$ 890,00",
    parcela3x: "R$ 335,00",
    parcela6x: "R$ 189,50",
    parcela10x: "R$ 126,40"
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
