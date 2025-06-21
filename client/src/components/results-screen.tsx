import { motion } from 'framer-motion';
import { Search, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LensCard } from './lens-card';
import { Lens, LensFilter } from '@shared/schema';
import { getQuestionLabel } from '@/lib/lens-data';

interface ResultsScreenProps {
  filteredLenses: Lens[];
  answers: LensFilter;
  onNewSearch: () => void;
  onUpdatePrices: () => void;
}

export const ResultsScreen = ({ 
  filteredLenses, 
  answers, 
  onNewSearch, 
  onUpdatePrices 
}: ResultsScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen gradient-dark"
    >
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Lentes Disponíveis</h2>
            <p className="text-muted-foreground">Baseado na sua configuração</p>
          </motion.div>
          
          {/* Configuration Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-3d gradient-dark-blue rounded-xl shadow-3d-md border border-primary/30 mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">ESSAS SÃO AS LENTES DISPONÍVEIS PARA A CONFIGURAÇÃO</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(answers).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground">{getQuestionLabel(key)}:</span>{' '}
                      <span className="text-primary font-medium">
                        {typeof value === 'boolean' ? (value ? 'SIM' : 'NÃO') : value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-primary font-semibold">{filteredLenses.length} lente(s) encontrada(s)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Results Container */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {filteredLenses.length === 0 ? (
              <Card className="card-3d lens-card rounded-xl shadow-3d-md text-center">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-muted-foreground mb-4">
                    Nenhuma lente encontrada
                  </h3>
                  <p className="text-muted-foreground">
                    Tente ajustar seus critérios de busca
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredLenses.map((lens, index) => (
                <LensCard key={lens.id} lens={lens} index={index} />
              ))
            )}
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
          >
            <Button 
              onClick={onNewSearch}
              className="btn-3d bg-accent hover:bg-accent/80 text-accent-foreground py-3 px-6 rounded-xl shadow-3d-md hover:glow-blue"
              variant="outline"
            >
              <Search className="w-4 h-4 mr-2" />
              Nova Pesquisa
            </Button>
            <Button 
              onClick={onUpdatePrices}
              className="btn-3d gradient-blue-primary text-white py-3 px-6 rounded-xl shadow-3d-md glow-blue"
            >
              <Upload className="w-4 h-4 mr-2" />
              Atualizar Preços
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
