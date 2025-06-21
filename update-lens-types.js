// Script para atualizar os arquivos HTML com tipos de visão corretos
import fs from 'fs';

// Mapeamento correto dos tipos baseado na planilha PRECIFICAÇÃO_REAL
const lensTypes = {
  // IDs 1-26: VISÃO SIMPLES
  1: "VISÃO SIMPLES", 2: "VISÃO SIMPLES", 3: "VISÃO SIMPLES", 4: "VISÃO SIMPLES", 5: "VISÃO SIMPLES",
  6: "VISÃO SIMPLES", 7: "VISÃO SIMPLES", 8: "VISÃO SIMPLES", 9: "VISÃO SIMPLES", 10: "VISÃO SIMPLES",
  11: "VISÃO SIMPLES", 12: "VISÃO SIMPLES", 13: "VISÃO SIMPLES", 14: "VISÃO SIMPLES", 15: "VISÃO SIMPLES",
  16: "VISÃO SIMPLES", 17: "VISÃO SIMPLES", 18: "VISÃO SIMPLES", 19: "VISÃO SIMPLES", 20: "VISÃO SIMPLES",
  21: "VISÃO SIMPLES", 22: "VISÃO SIMPLES", 23: "VISÃO SIMPLES", 24: "VISÃO SIMPLES", 25: "VISÃO SIMPLES", 26: "VISÃO SIMPLES",
  
  // IDs 27-34: LENTES SOLARES
  27: "LENTES SOLARES", 28: "LENTES SOLARES", 29: "LENTES SOLARES", 30: "LENTES SOLARES",
  31: "LENTES SOLARES", 32: "LENTES SOLARES", 33: "LENTES SOLARES", 34: "LENTES SOLARES",
  
  // ID 35: BIFOCAIS CR-39
  35: "BIFOCAIS CR-39",
  
  // IDs 36-43: PROGRESSIVAS ACABADAS
  36: "PROGRESSIVAS ACABADAS", 37: "PROGRESSIVAS ACABADAS", 38: "PROGRESSIVAS ACABADAS", 39: "PROGRESSIVAS ACABADAS",
  40: "PROGRESSIVAS ACABADAS", 41: "PROGRESSIVAS ACABADAS", 42: "PROGRESSIVAS ACABADAS", 43: "PROGRESSIVAS ACABADAS"
};

function updateHtmlFile(filename) {
  try {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Atualizar cada lente com seu tipo correto
    for (let id = 1; id <= 43; id++) {
      const type = lensTypes[id];
      const pattern = new RegExp(`(\\{id: ${id},.*?), medidas:`, 'g');
      content = content.replace(pattern, `$1, tipo: "${type}", medidas:`);
    }
    
    fs.writeFileSync(filename, content);
    console.log(`✓ ${filename} atualizado com tipos de visão`);
  } catch (error) {
    console.error(`Erro ao atualizar ${filename}:`, error.message);
  }
}

// Atualizar ambos os arquivos HTML
updateHtmlFile('standalone-app.html');
updateHtmlFile('standalone-app-iphone.html');

console.log('Todos os arquivos foram atualizados com os tipos de visão corretos!');