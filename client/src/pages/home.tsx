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
        
        {currentScreen === 'question' && (
          <QuestionScreen 
            key="question"
            currentStep={currentStep}
            progress={progress}
            onAnswer={selectAnswer}
            onBack={goBack}
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
