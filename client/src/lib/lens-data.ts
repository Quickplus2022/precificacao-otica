import { Lens } from "@shared/schema";

export const defaultLensData: Lens[] = [
  {
    id: 1,
    nome: "Lente Essilor Transitions",
    incolor: false,
    antireflexo: true,
    fotosensivel: true,
    blueCut: true,
    medidas: "-2.00 a +2.00",
    esf: null,
    cil: null,
    espessura: "1.50",
    precoVista: "R$ 450,00",
    parcela3x: "R$ 165,00",
    parcela6x: "R$ 89,50",
    parcela10x: "R$ 58,90"
  },
  {
    id: 2,
    nome: "Lente Zeiss BlueGuard",
    incolor: true,
    antireflexo: true,
    fotosensivel: false,
    blueCut: true,
    medidas: "-4.00 a +4.00",
    esf: null,
    cil: null,
    espessura: "1.67",
    precoVista: "R$ 320,00",
    parcela3x: "R$ 118,00",
    parcela6x: "R$ 63,80",
    parcela10x: "R$ 41,90"
  },
  {
    id: 3,
    nome: "Lente Hoya Clear",
    incolor: true,
    antireflexo: false,
    fotosensivel: false,
    blueCut: false,
    medidas: "-1.00 a +1.00",
    esf: null,
    cil: null,
    espessura: "1.50",
    precoVista: "R$ 180,00",
    parcela3x: "R$ 66,00",
    parcela6x: "R$ 35,70",
    parcela10x: "R$ 23,40"
  },
  {
    id: 4,
    nome: "Lente Premium Anti-reflexo",
    incolor: false,
    antireflexo: true,
    fotosensivel: true,
    blueCut: false,
    medidas: "-6.00 a +6.00",
    esf: null,
    cil: null,
    espessura: "1.74",
    precoVista: "R$ 680,00",
    parcela3x: "R$ 250,00",
    parcela6x: "R$ 135,40",
    parcela10x: "R$ 89,00"
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
    'incolor': 'Incolor',
    'antireflexo': 'Antirreflexo',
    'fotosensivel': 'Fotosensível',
    'blueCut': 'Blue Cut',
    'medidas': 'Graduação',
    'espessura': 'Espessura'
  };
  return labels[key] || key;
};
