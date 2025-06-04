import multer from "multer";
import path from "path";
import fs from "fs";

// Definindo o caminho para onde os arquivos serão salvos
const uploadPath = path.join(__dirname, "../uploads");

// Cria o diretório caso não exista
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Configuração do multer para salvar os arquivos no diretório uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Criando a instância do multer com a configuração de armazenamento
const multerInstance = multer({ storage });

export default multerInstance;
