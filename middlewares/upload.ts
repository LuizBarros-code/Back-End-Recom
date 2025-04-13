// filepath: c:\Users\netoz\Desktop\Projetos\Sistema recom\Back-End-Recom\middlewares\upload.ts
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;