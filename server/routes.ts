
import { Express } from 'express';

export function registerRoutes(app: Express) {
  app.get('/', (req, res) => {
    res.send('API funcionando!');
  });

  // Adicione outras rotas conforme necessário
}
