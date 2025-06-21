import { Lens } from "@shared/schema";

// Dados corretos baseados nas imagens do Power BI fornecidas pelo usuário
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
    parcela3x: "R$ 33,93",
    parcela6x: "R$ 18,96",
    parcela10x: "R$ 13,47"
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
    parcela3x: "R$ 56,70",
    parcela6x: "R$ 31,70",
    parcela10x: "R$ 22,50"
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
    parcela3x: "R$ 105,84",
    parcela6x: "R$ 59,15",
    parcela10x: "R$ 42,00"
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
