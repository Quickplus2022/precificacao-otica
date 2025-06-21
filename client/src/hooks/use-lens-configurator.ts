import { useState, useCallback, useEffect } from 'react';
import { Lens, LensFilter } from '@shared/schema';
import { defaultLensData } from '@/lib/lens-data';
import { loadFromLocalStorage, getAvailableOptions, getLocalAvailableOptions } from '@/lib/excel-parser';

export type Screen = 'welcome' | 'question' | 'results' | 'upload';

interface Question {
  text: string;
  key: keyof LensFilter;
  options: { label: string; value: string | boolean }[];
}

export const useLensConfigurator = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<LensFilter>({});
  const [lensData, setLensData] = useState<Lens[]>(() => {
    const saved = loadFromLocalStorage();
    return saved || defaultLensData;
  });
  const [availableOptions, setAvailableOptions] = useState<{
    medidas: string[];
    esf: string[];
    cil: string[];
    espessuras: string[];
    count: number;
    hasEsfCil: boolean;
  }>({ medidas: [], esf: [], cil: [], espessuras: [], count: 0, hasEsfCil: false });

  // Sistema de perguntas dinâmico baseado na filtragem progressiva
  const [questions, setQuestions] = useState<Question[]>([]);

  // Gerar perguntas dinamicamente, sempre mostrando opções válidas baseado nos filtros atuais
  useEffect(() => {
    const generateCurrentQuestion = () => {
      // Aplicar filtros atuais para ver que dados restam
      const currentFilteredData = lensData.filter(lens => {
        return Object.entries(answers).every(([key, value]) => {
          if (value === undefined || value === null) return true;
          return lens[key as keyof Lens] === value;
        });
      });

      // Determinar próxima pergunta baseada no que já foi respondido
      if (!('incolor' in answers)) {
        // Verificar que valores de incolor existem nos dados atuais
        const incolorValues = Array.from(new Set(currentFilteredData.map(lens => lens.incolor)));
        const options = incolorValues.map(value => ({
          label: value ? "SIM" : "NÃO",
          value: value
        }));
        
        setQuestions([{
          text: "É incolor?",
          key: "incolor",
          options: options
        }]);
        return;
      }
      
      if (!('antireflexo' in answers)) {
        const antireflexoValues = Array.from(new Set(currentFilteredData.map(lens => lens.antireflexo)));
        const options = antireflexoValues.map(value => ({
          label: value ? "SIM" : "NÃO",
          value: value
        }));
        
        setQuestions([{
          text: "Tem antirreflexo?",
          key: "antireflexo",
          options: options
        }]);
        return;
      }
      
      if (!('fotosensivel' in answers)) {
        const fotosensibleValues = Array.from(new Set(currentFilteredData.map(lens => lens.fotosensivel)));
        const options = fotosensibleValues.map(value => ({
          label: value ? "SIM" : "NÃO",
          value: value
        }));
        
        setQuestions([{
          text: "É fotosensível?",
          key: "fotosensivel",
          options: options
        }]);
        return;
      }
      
      if (!('blueCut' in answers)) {
        const blueCutValues = Array.from(new Set(currentFilteredData.map(lens => lens.blueCut)));
        const options = blueCutValues.map(value => ({
          label: value ? "SIM" : "NÃO",
          value: value
        }));
        
        setQuestions([{
          text: "Tem blue cut?",
          key: "blueCut",
          options: options
        }]);
        return;
      }
      
      if (!('medidas' in answers)) {
        const medidasValues = Array.from(new Set(currentFilteredData.map(lens => lens.medidas).filter(Boolean)));
        const options = medidasValues.map(value => ({
          label: value as string,
          value: value as string
        }));
        
        setQuestions([{
          text: "Em qual faixa está o grau?",
          key: "medidas",
          options: options.sort((a, b) => a.label.localeCompare(b.label))
        }]);
        return;
      }
      
      if (!('espessura' in answers)) {
        const espessuraValues = Array.from(new Set(currentFilteredData.map(lens => lens.espessura).filter(Boolean)));
        const options = espessuraValues.map(value => ({
          label: value,
          value: value
        }));
        
        setQuestions([{
          text: "Qual a espessura?",
          key: "espessura",
          options: options.sort((a, b) => a.label.localeCompare(b.label))
        }]);
        return;
      }
      
      // Todas as perguntas respondidas
      setQuestions([]);
      setCurrentScreen('results');
    };

    generateCurrentQuestion();
  }, [answers, lensData]);



  const startQuestionnaire = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setCurrentScreen('question');
  }, []);

  const selectAnswer = useCallback((answer: string | boolean) => {
    const question = questions[0]; // Sempre a primeira pergunta da lista atual
    const newAnswers = { ...answers, [question.key]: answer };
    setAnswers(newAnswers);
    
    // Não mudar de tela aqui - deixar o useEffect gerar a próxima pergunta
    // ou ir para resultados quando não houver mais perguntas
  }, [answers, questions]);

  const goBack = useCallback(() => {
    const answeredKeys = Object.keys(answers);
    if (answeredKeys.length > 0) {
      // Remover a última resposta
      const lastKey = answeredKeys[answeredKeys.length - 1];
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[lastKey];
        return newAnswers;
      });
    } else {
      setCurrentScreen('welcome');
    }
  }, [answers]);

  const resetApp = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setCurrentScreen('welcome');
  }, []);

  const showUploadScreen = useCallback(() => {
    setCurrentScreen('upload');
  }, []);

  const hideUploadScreen = useCallback(() => {
    setCurrentScreen('results');
  }, []);

  const filterLenses = useCallback((filters: LensFilter): Lens[] => {
    return lensData.filter(lens => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined) return true;
        return lens[key as keyof Lens] === value;
      });
    });
  }, [lensData]);

  const filteredLenses = filterLenses(answers);
  
  // Calcular progresso baseado no número de respostas vs total de perguntas esperadas
  const totalQuestions = 6; // incolor, antireflexo, fotosensivel, blueCut, medidas, espessura
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  
  const currentQuestion = questions[0]; // Sempre mostra a primeira pergunta da lista atual

  return {
    currentScreen,
    setCurrentScreen,
    currentStep,
    answers,
    lensData,
    setLensData,
    filteredLenses,
    progress,
    questions,
    currentQuestion,
    availableOptions,
    startQuestionnaire,
    selectAnswer,
    goBack,
    resetApp,
    showUploadScreen,
    hideUploadScreen
  };
};
