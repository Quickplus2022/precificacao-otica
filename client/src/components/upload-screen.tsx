import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { uploadExcelFile, saveToLocalStorage, validateExcelFile } from '@/lib/excel-parser';
import { Lens } from '@shared/schema';

interface UploadScreenProps {
  onCancel: () => void;
  onUploadSuccess: (lenses: Lens[]) => void;
}

export const UploadScreen = ({ onCancel, onUploadSuccess }: UploadScreenProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!validateExcelFile(file)) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const parsedData = await uploadExcelFile(file);
      
      // Salvar no localStorage
      saveToLocalStorage(parsedData);
      
      toast({
        title: "Arquivo carregado com sucesso",
        description: `${parsedData.length} lentes foram importadas com sucesso.`,
      });

      // Passar os dados para o componente pai
      onUploadSuccess(parsedData);
      
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao processar o arquivo. Verifique se o formato está correto.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen gradient-dark flex items-center justify-center px-6"
    >
      <div className="max-w-md mx-auto text-center">
        <Card className="card-3d lens-card rounded-xl shadow-3d-lg">
          <CardContent className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-primary mb-4">Atualizar Preços</h2>
              <p className="text-muted-foreground mb-6">
                Selecione o arquivo PRECIFICAÇÃO.xlsx atualizado
              </p>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-6 mb-6 transition-colors ${
                  isDragOver 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
              >
                <input 
                  type="file" 
                  id="fileInput" 
                  accept=".xlsx,.xls" 
                  className="hidden"
                  onChange={handleFileSelect}
                />
                
                <div className="text-center">
                  <FileSpreadsheet className="w-12 h-12 text-primary mx-auto mb-4" />
                  <Button
                    onClick={() => document.getElementById('fileInput')?.click()}
                    className="btn-3d gradient-blue-primary text-white py-3 px-6 rounded-xl shadow-3d-sm mb-2 glow-blue"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>Processando...</>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Arquivo
                      </>
                    )}
                  </Button>
                  <p className="text-muted-foreground text-sm">
                    Ou arraste o arquivo aqui
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Apenas arquivos .xlsx
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={onCancel}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground transition-colors"
                disabled={isUploading}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
