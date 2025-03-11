import express from "express";
import cors from "cors";
import { router } from "./routes/index";

const app = express();
const port = 3456;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Usar o roteador
app.use(router);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//ts-node server.ts