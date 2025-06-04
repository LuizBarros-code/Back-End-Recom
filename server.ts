import express from "express";
import cors from "cors";
import { router } from "./routes/index"; // Assuma que você tem rotas adicionais
import path from "path";
import multer from "multer";
import fs from "fs";

// Cria a pasta uploads se ela não existir
const uploadPath = path.resolve("uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Configuração do multer com nome de arquivo personalizado
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const app = express();
const port = 3456;

// Middlewares
app.use(express.json());
app.use(cors());

// Middleware de log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Query Params:", req.query);
  console.log("Body:", req.body);
  console.log("Params:", req.params);
  next();
});

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.resolve("uploads")));

// Endpoint de upload de imagem
app.post("/upload", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Nenhum arquivo enviado." });
    return;
  }

  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.status(200).json({ message: "Upload bem-sucedido!", imageUrl });
});

// Usar o roteador se você tiver outras rotas
app.use(router);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
