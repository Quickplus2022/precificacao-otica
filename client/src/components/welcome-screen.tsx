import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col justify-center items-center gradient-dark px-6"
    >
      <div className="text-center max-w-md mx-auto">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full gradient-blue-primary flex items-center justify-center shadow-3d-xl glow-blue">
            <Eye className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-4 text-primary"
        >
          Configurador de Óculos
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground mb-8 text-lg leading-relaxed"
        >
          Vamos montar o óculos perfeito para você através de algumas perguntas simples
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={onStart}
            className="btn-3d gradient-blue-primary text-white font-semibold py-4 px-8 rounded-xl shadow-3d-lg hover:shadow-3d-xl transition-all duration-300 text-lg glow-blue"
          >
            Começar
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
