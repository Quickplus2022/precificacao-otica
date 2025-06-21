import { useState, useCallback, useEffect } from 'react';
import { Lens, LensFilter } from '@shared/schema';
import { defaultLensData } from '@/lib/lens-data';
import { loadFromLocalStorage, getAvailableOptions } from '@/lib/excel-parser';

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

  // Perguntas base - serão atualizadas dinamicamente
  const [questions, setQuestions] = useState<Question[]>([
    {
      text: "É incolor?",
      key: "incolor",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false }
      ]
    },
    {
      text: "Tem antirreflexo?",
      key: "antireflexo",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false }
      ]
    },
    {
      text: "É fotosensível?",
      key: "fotosensivel",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false }
      ]
    },
    {
      text: "Tem blue cut?",
      key: "blueCut",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false }
      ]
    },
    {
      text: "Qual a graduação?",
      key: "medidas",
      options: []
    },
    {
      text: "Qual a espessura?",
      key: "espessura",
      options: []
    }
  ]);

  // Atualizar opções disponíveis quando os dados ou respostas mudarem
  useEffect(() => {
    const updateAvailableOptions = async () => {
      try {
        const options = await getAvailableOptions(lensData, answers);
        setAvailableOptions(options);
        
        // Atualizar as perguntas com as opções dinâmicas
        setQuestions(prev => prev.map(question => {
          if (question.key === 'medidas') {
            return {
              ...question,
              options: options.medidas.map((medida: string) => ({
                label: medida,
                value: medida
              }))
            };
          }
          if (question.key === 'espessura') {
            return {
              ...question,
              options: options.espessuras.map((espessura: string) => ({
                label: espessura,
                value: espessura
              }))
            };
          }
          return question;
        }));
      } catch (error) {
        console.error('Erro ao obter opções disponíveis:', error);
        // Fallback para dados locais
        const localOptions = getLocalAvailableOptions(lensData, answers);
        setAvailableOptions(localOptions);
        
        setQuestions(prev => prev.map(question => {
          if (question.key === 'medidas') {
            return {
              ...question,
              options: localOptions.medidas.map((medida: string) => ({
                label: medida,
                value: medida
              }))
            };
          }
          if (question.key === 'espessura') {
            return {
              ...question,
              options: localOptions.espessuras.map((espessura: string) => ({
                label: espessura,
                value: espessura
              }))
            };
          }
          return question;
        }));
      }
    };

    updateAvailableOptions();
  }, [lensData, answers]);

  // Função local para filtrar opções quando a API não estiver disponível
  const getLocalAvailableOptions = (data: Lens[], currentFilters: LensFilter) => {
    const filteredData = data.filter(lens => {
      return Object.entries(currentFilters).every(([key, value]) => {
        if (value === undefined || value === null) return true;
        return lens[key as keyof Lens] === value;
      });
    });
    
    const medidasArray = filteredData.map(lens => lens.medidas).filter(Boolean);
    const espessurasArray = filteredData.map(lens => lens.espessura).filter(Boolean);
    
    const uniqueMedidas = medidasArray.filter((value, index, self) => self.indexOf(value) === index);
    const uniqueEspessuras = espessurasArray.filter((value, index, self) => self.indexOf(value) === index);
    
    return {
      medidas: uniqueMedidas.sort(),
      espessuras: uniqueEspessuras.sort(),
      count: filteredData.length
    };
  };

  const startQuestionnaire = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setCurrentScreen('question');
  }, []);

  const selectAnswer = useCallback((answer: string | boolean) => {
    const question = questions[currentStep];
    const newAnswers = { ...answers, [question.key]: answer };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentScreen('results');
    }
  }, [currentStep, answers, questions]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Remover a resposta da pergunta atual quando voltar
      const currentQuestion = questions[currentStep];
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestion.key];
        return newAnswers;
      });
    } else {
      setCurrentScreen('welcome');
    }
  }, [currentStep, questions]);

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
  const progress = (currentStep / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  return {
    currentScreen,
    setCurrentScreen,
    currentStep,
    answers,
    lensData,
    setLensData,
    filteredLenses,
    progress,
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
