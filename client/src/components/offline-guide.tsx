import { motion } from 'framer-motion';
import { Smartphone, Wifi, Download, Share, Home, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OfflineGuideProps {
  onClose: () => void;
}

export const OfflineGuide = ({ onClose }: OfflineGuideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="card-3d lens-card shadow-3d-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Como usar no celular offline
              </h2>
              <Button onClick={onClose} variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6 text-sm">
              {/* Para Android */}
              <div>
                <h3 className="font-semibold text-primary mb-2 flex items-center">
                  📱 No Android:
                </h3>
                <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                  <li>Abra este site no Chrome</li>
                  <li>Toque nos 3 pontinhos (⋮) no canto superior direito</li>
                  <li>Selecione "Adicionar à tela inicial"</li>
                  <li>Confirme "Adicionar"</li>
                  <li>O ícone aparecerá na sua tela inicial</li>
                </ol>
              </div>

              {/* Para iPhone */}
              <div>
                <h3 className="font-semibold text-primary mb-2 flex items-center">
                  🍎 No iPhone/iPad:
                </h3>
                <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                  <li>Abra este site no Safari</li>
                  <li>Toque no botão compartilhar <Share className="w-3 h-3 inline" /></li>
                  <li>Role para baixo e toque "Adicionar à Tela de Início"</li>
                  <li>Toque "Adicionar"</li>
                  <li>O app aparecerá na sua tela inicial</li>
                </ol>
              </div>

              {/* Como funciona offline */}
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2 flex items-center">
                  <Wifi className="w-4 h-4 mr-1" />
                  Funcionamento offline:
                </h3>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>• O app funciona sem internet após a instalação</li>
                  <li>• Todos os dados ficam salvos no seu celular</li>
                  <li>• Você pode atualizar preços via upload de planilha</li>
                  <li>• Ideal para usar em locais sem internet</li>
                </ul>
              </div>

              {/* Dica importante */}
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-1">💡 Como usar:</h3>
                <ol className="text-xs text-muted-foreground space-y-1">
                  <li>1. Acesse o link público do app no seu celular</li>
                  <li>2. Instale seguindo as instruções acima</li>
                  <li>3. Use "Atualizar Preços" → "Editar Manualmente" para configurar</li>
                  <li>4. Depois funciona offline em qualquer lugar!</li>
                </ol>
              </div>

              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-400 mb-1">🎉 Pronto para usar!</h3>
                <p className="text-xs text-green-300/80">
                  Após o deployment, você receberá um link que funciona em qualquer celular, 
                  mesmo sem estar no Replit. O app fica completamente independente!
                </p>
              </div>
            </div>

            <Button onClick={onClose} className="w-full mt-6">
              Entendi, vamos começar!
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};