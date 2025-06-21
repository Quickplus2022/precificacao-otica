
import express from 'express';
import { registerRoutes } from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
