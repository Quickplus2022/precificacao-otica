import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Lens } from '@shared/schema';

interface LensCardProps {
  lens: Lens;
  index: number;
}

export const LensCard = ({ lens, index }: LensCardProps) => {
  // Função para calcular valor total das parcelas
  const calculateTotal = (parcelaValue: string, numParcelas: number) => {
    const value = parseFloat(parcelaValue.replace('R$', '').replace(',', '.').trim());
    const total = value * numParcelas;
    return `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="card-3d lens-card rounded-xl shadow-3d-lg border">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-primary mb-2">{lens.nome}</h3>
            {lens.tipo && (
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {lens.tipo}
                </span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
              <span>Espessura: <span className="text-foreground">{lens.espessura}</span></span>
              <span>Graduação: <span className="text-foreground">{lens.medidas}</span></span>
            </div>
            <div className="flex flex-wrap gap-1 text-xs">
              {lens.incolor && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Incolor</span>}
              {lens.antireflexo && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Antirreflexo</span>}
              {lens.fotosensivel && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Fotossensível</span>}
              {lens.blueCut && <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded">Blue Cut</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cash Price */}
            <div className="bg-card rounded-lg p-4 border border-primary/30">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">À Vista</p>
                <p className="price-highlight text-2xl font-bold">{lens.precoVista}</p>
              </div>
            </div>
            
            {/* Installment Options */}
            <div className="space-y-3">
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground text-sm">3x de {lens.parcela3x}</span>
                  <span className="text-primary font-semibold">{lens.parcela3x}</span>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  Valor final: {calculateTotal(lens.parcela3x, 3)}
                </div>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground text-sm">6x de {lens.parcela6x}</span>
                  <span className="text-primary font-semibold">{lens.parcela6x}</span>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  Valor final: {calculateTotal(lens.parcela6x, 6)}
                </div>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground text-sm">10x de {lens.parcela10x}</span>
                  <span className="text-primary font-semibold">{lens.parcela10x}</span>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  Valor final: {calculateTotal(lens.parcela10x, 10)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
