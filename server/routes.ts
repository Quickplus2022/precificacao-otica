
import express from "express";
import multer from "multer";
import { readExcelFile, parseExcelDataToLenses, getAvailableOptions } from "./excel-reader";
import storage from "./storage";

const upload = multer();
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Arquivo não enviado." });
    }

    const rawData = readExcelFile(req.file.buffer);
    const lenses = parseExcelDataToLenses(rawData);

    await storage.setItem("lenses", lenses);
    res.json({ message: "Arquivo processado com sucesso." });
  } catch (error) {
    console.error("Erro ao processar o arquivo:", error);
    res.status(500).json({ message: "Erro ao processar o arquivo." });
  }
});

router.get("/options", async (req, res) => {
  try {
    const lenses = await storage.getItem("lenses");
    if (!lenses) {
      return res.status(404).json({ message: "Nenhuma lente encontrada." });
    }

    const options = getAvailableOptions(lenses);
    res.json(options);
  } catch (error) {
    console.error("Erro ao obter opções:", error);
    res.status(500).json({ message: "Erro ao obter opções." });
  }
});

export default router;
