import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Smartphone, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OfflineGuide } from './offline-guide';

interface WelcomeScreenProps {
  onStart: () => void;
  onUpload: () => void;
}

export const WelcomeScreen = ({ onStart, onUpload }: WelcomeScreenProps) => {
  const [showOfflineGuide, setShowOfflineGuide] = useState(false);
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
          className="text-muted-foreground mb-6 text-lg leading-relaxed"
        >
          Vamos montar o óculos perfeito para você através de algumas perguntas simples
        </motion.p>

        {/* Banner de instalação mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center"
        >
          <Smartphone className="w-6 h-6 mx-auto mb-2 text-blue-400" />
          <h3 className="text-sm font-semibold text-blue-300 mb-1">
            Use sem internet no celular!
          </h3>
          <p className="text-xs text-blue-200/80 mb-3">
            Instale este app no seu celular e use offline em qualquer lugar
          </p>
          <Button 
            onClick={() => setShowOfflineGuide(true)}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-xs"
          >
            Ver como instalar
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button 
            onClick={onStart}
            className="btn-3d gradient-blue-primary text-white font-semibold py-4 px-8 rounded-xl shadow-3d-lg hover:shadow-3d-xl transition-all duration-300 text-lg glow-blue"
          >
            Começar
          </Button>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onUpload}
              variant="outline"
              className="btn-3d border-primary hover:bg-primary/10 py-4 px-6 rounded-xl shadow-3d-md transition-all duration-300"
            >
              <Upload className="w-4 h-4 mr-2" />
              Atualizar Planilha
            </Button>
            <Button 
              onClick={() => setShowOfflineGuide(true)}
              variant="outline"
              className="btn-3d border-blue-500 hover:bg-blue-500/10 py-4 px-6 rounded-xl shadow-3d-md transition-all duration-300"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Usar Offline
            </Button>
          </div>
        </motion.div>
      </div>
      
      {showOfflineGuide && (
        <OfflineGuide onClose={() => setShowOfflineGuide(false)} />
      )}
    </motion.div>
  );
};
