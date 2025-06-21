import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Question {
  text: string;
  key: string;
  options: { label: string; value: string | boolean }[];
}

interface QuestionScreenProps {
  currentStep: number;
  progress: number;
  onAnswer: (answer: string | boolean) => void;
  onBack: () => void;
  questions: Question[];
  answeredCount: number;
}

export const QuestionScreen = ({ currentStep, progress, onAnswer, onBack, questions, answeredCount }: QuestionScreenProps) => {
  const question = questions[currentStep];

  if (!question) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col gradient-dark"
    >
      {/* Progress Bar */}
      <div className="w-full bg-muted h-3">
        <motion.div 
          className="gradient-blue-primary h-3 transition-all duration-500 shadow-3d-sm"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
        <div className="max-w-md mx-auto text-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-primary text-sm font-semibold">
              PERGUNTA {currentStep + 1} DE {questions.length}
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-6 text-foreground">
              {question.text}
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Button
                  onClick={() => onAnswer(option.value)}
                  className="btn-3d w-full py-4 px-6 rounded-xl shadow-3d-md transition-all duration-300 text-left bg-card hover:bg-accent border border-border hover:border-primary hover:glow-blue"
                  variant="outline"
                >
                  {option.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Back Button */}
          {answeredCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={onBack}
                variant="ghost"
                className="mt-8 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
