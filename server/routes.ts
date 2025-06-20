import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { readExcelFile, parseExcelDataToLenses, getAvailableOptions } from "./excel-reader";

const upload = multer({ dest: 'uploads/' });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload endpoint for Excel files
  app.post('/api/upload-excel', upload.single('file'), (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const { originalname, filename, mimetype, path: filePath } = req.file;
      
      // Validate file type
      if (!mimetype.includes('sheet') && !originalname.endsWith('.xlsx') && !originalname.endsWith('.xls')) {
        return res.status(400).json({ error: 'Tipo de arquivo inválido. Apenas arquivos Excel são aceitos.' });
      }

      // Read and parse Excel file
      const fileBuffer = fs.readFileSync(filePath);
      const excelData = readExcelFile(fileBuffer);
      const lensData = parseExcelDataToLenses(excelData);

      // Clean up uploaded file
      fs.unlinkSync(filePath);
      
      res.json({ 
        message: 'Arquivo carregado com sucesso',
        filename: originalname,
        data: lensData,
        count: lensData.length
      });
    } catch (error) {
      console.error('Erro no upload:', error);
      res.status(500).json({ error: 'Erro ao processar arquivo Excel' });
    }
  });

  // Get available options based on current filters
  app.post('/api/available-options', (req, res) => {
    try {
      const { lensData, currentFilters } = req.body;
      
      if (!lensData || !Array.isArray(lensData)) {
        return res.status(400).json({ error: 'Dados de lentes inválidos' });
      }

      const options = getAvailableOptions(lensData, currentFilters || {});
      res.json(options);
    } catch (error) {
      console.error('Erro ao obter opções:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
