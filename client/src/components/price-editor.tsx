import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { defaultLensData } from '@/lib/lens-data';
import { saveToLocalStorage } from '@/lib/excel-parser';
import { Lens } from '@shared/schema';

interface PriceEditorProps {
  onClose: () => void;
  onSave: (lenses: Lens[]) => void;
}

export const PriceEditor = ({ onClose, onSave }: PriceEditorProps) => {
  const [lenses, setLenses] = useState<Lens[]>(defaultLensData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editForm, setEditForm] = useState({
    nome: '',
    incolor: false,
    antireflexo: false,
    fotosensivel: false,
    blueCut: false,
    espessura: '',
    medidas: '',
    precoVista: '',
    parcela3x: '',
    parcela6x: '',
    parcela10x: ''
  });
  const { toast } = useToast();

  // Filtrar lentes pela busca
  const filteredLenses = lenses.filter(lens =>
    lens.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lens.medidas?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (lens: Lens) => {
    setEditingId(lens.id);
    setEditForm({
      nome: lens.nome,
      incolor: lens.incolor,
      antireflexo: lens.antireflexo,
      fotosensivel: lens.fotosensivel,
      blueCut: lens.blueCut,
      espessura: lens.espessura,
      medidas: lens.medidas || '',
      precoVista: lens.precoVista.replace('R$ ', '').replace(',', '.'),
      parcela3x: lens.parcela3x.replace('R$ ', '').replace(',', '.'),
      parcela6x: lens.parcela6x.replace('R$ ', '').replace(',', '.'),
      parcela10x: lens.parcela10x.replace('R$ ', '').replace(',', '.')
    });
  };

  const saveEdit = () => {
    if (!editingId) return;

    const formatPrice = (value: string) => {
      const num = parseFloat(value);
      return isNaN(num) ? 'R$ 0,00' : `R$ ${num.toFixed(2).replace('.', ',')}`;
    };

    const updatedLenses = lenses.map(lens =>
      lens.id === editingId
        ? {
            ...lens,
            nome: editForm.nome,
            incolor: editForm.incolor,
            antireflexo: editForm.antireflexo,
            fotosensivel: editForm.fotosensivel,
            blueCut: editForm.blueCut,
            espessura: editForm.espessura,
            medidas: editForm.medidas,
            precoVista: formatPrice(editForm.precoVista),
            parcela3x: formatPrice(editForm.parcela3x),
            parcela6x: formatPrice(editForm.parcela6x),
            parcela10x: formatPrice(editForm.parcela10x)
          }
        : lens
    );

    setLenses(updatedLenses);
    setEditingId(null);
    toast({
      title: "Lente atualizada!",
      description: "As alterações foram salvas.",
    });
  };

  const deleteLens = (id: number) => {
    const updatedLenses = lenses.filter(lens => lens.id !== id);
    setLenses(updatedLenses);
    toast({
      title: "Lente removida!",
      description: "A lente foi excluída da lista.",
    });
  };

  const addNewLens = () => {
    const newId = Math.max(...lenses.map(l => l.id)) + 1;
    const newLens: Lens = {
      id: newId,
      nome: "Nova Lente",
      incolor: false,
      antireflexo: false,
      fotosensivel: false,
      blueCut: false,
      espessura: "1.50",
      medidas: "Esf. 0,00 / Cil. 0,00",
      esf: null,
      cil: null,
      precoVista: "R$ 0,00",
      parcela3x: "R$ 0,00",
      parcela6x: "R$ 0,00",
      parcela10x: "R$ 0,00"
    };
    
    setLenses([...lenses, newLens]);
    startEdit(newLens);
  };

  const saveAll = () => {
    saveToLocalStorage(lenses);
    onSave(lenses);
    toast({
      title: "Preços salvos!",
      description: "Todos os preços foram atualizados com sucesso.",
    });
    onClose();
  };

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
        className="max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        <Card className="card-3d lens-card shadow-3d-lg h-full">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Editor de Preços</h2>
              <div className="flex gap-2">
                <Button onClick={saveAll} className="gradient-blue-primary text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Tudo
                </Button>
                <Button onClick={onClose} variant="ghost">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search and Add */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar lentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={addNewLens} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nova Lente
              </Button>
            </div>

            {/* Lista de Lentes */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {filteredLenses.map((lens) => (
                <Card key={lens.id} className="lens-card">
                  <CardContent className="p-4">
                    {editingId === lens.id ? (
                      // Modo de edição
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-3">
                          <div>
                            <Label>Nome</Label>
                            <Input
                              value={editForm.nome}
                              onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Espessura</Label>
                            <Input
                              value={editForm.espessura}
                              onChange={(e) => setEditForm({ ...editForm, espessura: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Medidas</Label>
                            <Input
                              value={editForm.medidas}
                              onChange={(e) => setEditForm({ ...editForm, medidas: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label>Incolor</Label>
                              <Select
                                value={editForm.incolor ? 'SIM' : 'NÃO'}
                                onValueChange={(value) => setEditForm({ ...editForm, incolor: value === 'SIM' })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="SIM">SIM</SelectItem>
                                  <SelectItem value="NÃO">NÃO</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Antirreflexo</Label>
                              <Select
                                value={editForm.antireflexo ? 'SIM' : 'NÃO'}
                                onValueChange={(value) => setEditForm({ ...editForm, antireflexo: value === 'SIM' })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="SIM">SIM</SelectItem>
                                  <SelectItem value="NÃO">NÃO</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Fotossensível</Label>
                              <Select
                                value={editForm.fotosensivel ? 'SIM' : 'NÃO'}
                                onValueChange={(value) => setEditForm({ ...editForm, fotosensivel: value === 'SIM' })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="SIM">SIM</SelectItem>
                                  <SelectItem value="NÃO">NÃO</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Blue Cut</Label>
                              <Select
                                value={editForm.blueCut ? 'SIM' : 'NÃO'}
                                onValueChange={(value) => setEditForm({ ...editForm, blueCut: value === 'SIM' })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="SIM">SIM</SelectItem>
                                  <SelectItem value="NÃO">NÃO</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label>Preço à Vista</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={editForm.precoVista}
                              onChange={(e) => setEditForm({ ...editForm, precoVista: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Parcela 3x</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={editForm.parcela3x}
                              onChange={(e) => setEditForm({ ...editForm, parcela3x: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Parcela 6x</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={editForm.parcela6x}
                              onChange={(e) => setEditForm({ ...editForm, parcela6x: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Parcela 10x</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={editForm.parcela10x}
                              onChange={(e) => setEditForm({ ...editForm, parcela10x: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="md:col-span-3 flex gap-2 justify-end">
                          <Button onClick={saveEdit} size="sm">
                            <Save className="w-4 h-4 mr-1" />
                            Salvar
                          </Button>
                          <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Modo de visualização
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <h3 className="font-semibold text-primary">{lens.nome}</h3>
                            <p className="text-xs text-muted-foreground">{lens.espessura} - {lens.medidas}</p>
                          </div>
                          <div className="text-xs">
                            <span className={lens.incolor ? 'text-green-500' : 'text-red-500'}>
                              {lens.incolor ? '✓' : '✗'} Incolor
                            </span>
                            <br />
                            <span className={lens.antireflexo ? 'text-green-500' : 'text-red-500'}>
                              {lens.antireflexo ? '✓' : '✗'} Antirreflexo
                            </span>
                          </div>
                          <div className="text-xs">
                            <span className={lens.fotosensivel ? 'text-green-500' : 'text-red-500'}>
                              {lens.fotosensivel ? '✓' : '✗'} Fotossensível
                            </span>
                            <br />
                            <span className={lens.blueCut ? 'text-green-500' : 'text-red-500'}>
                              {lens.blueCut ? '✓' : '✗'} Blue Cut
                            </span>
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-primary">{lens.precoVista}</div>
                            <div className="text-xs text-muted-foreground">
                              3x: {lens.parcela3x} | 6x: {lens.parcela6x} | 10x: {lens.parcela10x}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button onClick={() => startEdit(lens)} size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => deleteLens(lens.id)} size="sm" variant="outline" className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};