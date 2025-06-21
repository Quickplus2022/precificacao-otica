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

  // Gerar perguntas dinamicamente baseado no progresso atual
  useEffect(() => {
    const generateQuestions = () => {
      const newQuestions: Question[] = [];
      
      // 1. É incolor? - sempre primeira pergunta
      if (!('incolor' in answers)) {
        newQuestions.push({
          text: "É incolor?",
          key: "incolor",
          options: [
            { label: "SIM", value: true },
            { label: "NÃO", value: false }
          ]
        });
        setQuestions(newQuestions);
        return;
      }
      
      // 2. Tem antirreflexo? - se incolor já foi respondida
      if (!('antireflexo' in answers)) {
        newQuestions.push({
          text: "Tem antirreflexo?",
          key: "antireflexo",
          options: [
            { label: "SIM", value: true },
            { label: "NÃO", value: false }
          ]
        });
        setQuestions(newQuestions);
        return;
      }
      
      // 3. É fotosensível? - se antirreflexo já foi respondida
      if (!('fotosensivel' in answers)) {
        newQuestions.push({
          text: "É fotosensível?",
          key: "fotosensivel",
          options: [
            { label: "SIM", value: true },
            { label: "NÃO", value: false }
          ]
        });
        setQuestions(newQuestions);
        return;
      }
      
      // 4. Tem blue cut? - se fotosensível já foi respondida
      if (!('blueCut' in answers)) {
        newQuestions.push({
          text: "Tem blue cut?",
          key: "blueCut",
          options: [
            { label: "SIM", value: true },
            { label: "NÃO", value: false }
          ]
        });
        setQuestions(newQuestions);
        return;
      }
      
      // 5. Graduação - filtrar baseado nas respostas anteriores
      if (!('medidas' in answers)) {
        const filteredForMedidas = lensData.filter(lens => 
          lens.incolor === answers.incolor &&
          lens.antireflexo === answers.antireflexo &&
          lens.fotosensivel === answers.fotosensivel &&
          lens.blueCut === answers.blueCut
        );
        
        const medidasOptions = Array.from(new Set(filteredForMedidas.map(lens => lens.medidas).filter(Boolean)))
          .sort()
          .map(medida => ({ label: medida as string, value: medida as string }));
        
        newQuestions.push({
          text: "Em qual faixa está o grau?",
          key: "medidas",
          options: medidasOptions
        });
        setQuestions(newQuestions);
        return;
      }
      
      // 6. Espessura - filtrar baseado em todas as respostas anteriores
      if (!('espessura' in answers)) {
        const filteredForEspessura = lensData.filter(lens => 
          lens.incolor === answers.incolor &&
          lens.antireflexo === answers.antireflexo &&
          lens.fotosensivel === answers.fotosensivel &&
          lens.blueCut === answers.blueCut &&
          lens.medidas === answers.medidas
        );
        
        const espessuraOptions = Array.from(new Set(filteredForEspessura.map(lens => lens.espessura).filter(Boolean)))
          .sort()
          .map(espessura => ({ label: espessura, value: espessura }));
        
        newQuestions.push({
          text: "Qual a espessura?",
          key: "espessura",
          options: espessuraOptions
        });
        setQuestions(newQuestions);
        return;
      }
      
      // Se chegou aqui, todas as perguntas foram respondidas
      setQuestions([]);
    };

    generateQuestions();
  }, [answers, lensData]);



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
