import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // ajustado para usar em memória, se necessário

export default storage;
