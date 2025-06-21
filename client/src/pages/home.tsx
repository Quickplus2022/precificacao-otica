import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from '@/components/welcome-screen';
import { QuestionScreen } from '@/components/question-screen';
import { ResultsScreen } from '@/components/results-screen';
import { UploadScreen } from '@/components/upload-screen';
import { useLensConfigurator } from '@/hooks/use-lens-configurator';

export default function Home() {
  const {
    currentScreen,
    currentStep,
    answers,
    filteredLenses,
    progress,
    questions,
    setLensData,
    startQuestionnaire,
    selectAnswer,
    goBack,
    resetApp,
    showUploadScreen,
    hideUploadScreen
  } = useLensConfigurator();

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={startQuestionnaire} />
        )}
        
        {currentScreen === 'question' && questions.length > 0 && (
          <QuestionScreen 
            key="question"
            currentStep={0}
            progress={progress}
            onAnswer={selectAnswer}
            onBack={goBack}
            questions={questions}
            answeredCount={Object.keys(answers).length}
          />
        )}
        
        {currentScreen === 'results' && (
          <ResultsScreen 
            key="results"
            filteredLenses={filteredLenses}
            answers={answers}
            onNewSearch={resetApp}
            onUpdatePrices={showUploadScreen}
          />
        )}
        
        {currentScreen === 'upload' && (
          <UploadScreen 
            key="upload"
            onCancel={hideUploadScreen}
            onUploadSuccess={setLensData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
