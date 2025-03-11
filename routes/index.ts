import { Router } from "express";
import { AlunoController } from "../Controllers/Usuarios/AlunosControllers";
import { PessoaFisicaController } from "../Controllers/Usuarios/PessoaFisicaControllers";
import { PessoaJuridicaController } from "../Controllers/Usuarios/PessoaJuridicaControllers";
import EstabilizadorController from "../Controllers/Eletronicos/EstabilizadorController";
import FonteDeAlimentacaoController from "../Controllers/Eletronicos/FonteDeAlimentacaoController";
import GabineteController from "../Controllers/Eletronicos/GabineteController";
import HdController from "../Controllers/Eletronicos/HdController";
import ImpressoraController from "../Controllers/Eletronicos/ImpressoraController";
import MonitorController from "../Controllers/Eletronicos/MonitorController";
import NotebookController from "../Controllers/Eletronicos/NotebookController";
import PlacaMaeController from "../Controllers/Eletronicos/PlacaMaeController";
import ProcessadorController from "../Controllers/Eletronicos/ProcessadorController";
import TecladoController from "../Controllers/Eletronicos/TecladoController";
import DescarteController from "../Controllers/Saidas/DescarteController";
import DoacaoController from "../Controllers/Saidas/DoacaoController";
import DoacaoUsuarioController from "../Controllers/Saidas/DoacaoUsuarioController";
import SolicitacaoController from "../Controllers/Saidas/SolicitacaoController";
import { InscritosController } from '../Controllers/Usuarios/InscritosController';

const router = Router();
const alunoController = new AlunoController();
const pessoaFisicaController = new PessoaFisicaController();
const pessoaJuridicaController = new PessoaJuridicaController();
const estabilizadorController = new EstabilizadorController();
const fonteDeAlimentacaoController = new FonteDeAlimentacaoController();
const gabineteController = new GabineteController();
const hdController = new HdController();
const impressoraController = new ImpressoraController();
const monitorController = new MonitorController();
const notebookController = new NotebookController();
const placaMaeController = new PlacaMaeController();
const processadorController = new ProcessadorController();
const tecladoController = new TecladoController();
const descarteController = new DescarteController();
const doacaoController = new DoacaoController();
const doacaoUsuarioController = new DoacaoUsuarioController();
const solicitacaoController = new SolicitacaoController();
const inscritosController = new InscritosController();


// Aluno routes
router.post("/alunos", alunoController.create);
router.get("/alunos/:id", alunoController.read);
router.get('/alunos/matricula/:matricula', alunoController.getByMatricula);
router.get("/alunos/verify/:matricula/:password", alunoController.verifyCredentials);
router.put("/alunos/:email", alunoController.update);
router.delete("/alunos/:id", alunoController.delete);


// Pessoa Fisica routes
// Pessoa Fisica routes
router.post("/pessoasFisicas", pessoaFisicaController.create);
router.get("/pessoasFisicas/names", pessoaFisicaController.getAllByName); // Rota específica antes
router.get('/pessoaFisicas/email/:email', pessoaFisicaController.getByEmail);
router.get("/pessoasFisicas/verify/:email/:password", pessoaFisicaController.verifyCredentials);
router.get("/pessoasFisicas/:id", pessoaFisicaController.read); // Rota dinâmica depois
router.put("/pessoaFisicas/:id", pessoaFisicaController.update);
router.delete("/pessoasFisicas/:id", pessoaFisicaController.delete);




// Pessoa Juridica routes
router.post("/pessoasJuridicas", pessoaJuridicaController.create);
router.get("/pessoasJuridicas/names", pessoaJuridicaController.getAllByName); // Rota específica antes
router.get("/pessoasJuridicas/:id", pessoaJuridicaController.read);
router.get('/pessoaJuridicas/email/:email', pessoaJuridicaController.getByEmail);
router.get("/pessoasJuridicas/verify/:email/:password", pessoaJuridicaController.verifyCredentials);
router.put("/pessoasJuridicas/:email", pessoaJuridicaController.update);
router.delete("/pessoasJuridicas/:id", pessoaJuridicaController.delete);




// Inscritos routes
router.get('/inscritos', inscritosController.getAll);
router.get('/inscritos/:id', inscritosController.getById);
router.post('/inscritos', inscritosController.create);
router.put('/inscritos/:id', inscritosController.update);
router.delete('/inscritos/:id', inscritosController.delete);


// Estabilizador routes
router.post("/estabilizadores", estabilizadorController.create);
router.get("/estabilizadores", estabilizadorController.getAll);
router.get("/estabilizadores/:id", estabilizadorController.getById);
router.put("/estabilizadores/:id", estabilizadorController.update);


// Fonte de Alimentação routes
router.post("/fontesDeAlimentacao", fonteDeAlimentacaoController.create);
router.get("/fontesDeAlimentacao", fonteDeAlimentacaoController.getAll);
router.get("/fontesDeAlimentacao/:id", fonteDeAlimentacaoController.getById);
router.put("/fontesDeAlimentacao/:id", fonteDeAlimentacaoController.update);


// Gabinete routes
router.post("/gabinetes", gabineteController.create);
router.get("/gabinetes", gabineteController.getAll);
router.get("/gabinetes/:id", gabineteController.getById);
router.put("/gabinetes/:id", gabineteController.update);


// HD routes
router.post("/hds", hdController.create);
router.get("/hds", hdController.getAll);
router.get("/hds/:id", hdController.getById);
router.put("/hds/:id", hdController.update);


// Impressora routes
router.post("/impressoras", impressoraController.create);
router.get("/impressoras", impressoraController.getAll);
router.get("/impressoras/:id", impressoraController.getById);
router.put("/impressoras/:id", impressoraController.update);


// Monitor routes
router.post("/monitores", monitorController.create);
router.get("/monitores", monitorController.getAll);
router.get("/monitores/:id", monitorController.getById);
router.put("/monitores/:id", monitorController.update);


// Notebook routes
router.post("/notebooks", notebookController.create);
router.get("/notebooks", notebookController.getAll);
router.get("/notebooks/:id", notebookController.getById);
router.put("/notebooks/:id", notebookController.update);


// Placa Mãe routes
router.post("/placasMae", placaMaeController.create);
router.get("/placasMae", placaMaeController.getAll);
router.get("/placasMae/:id", placaMaeController.getById);
router.put("/placasMae/:id", placaMaeController.update);


// Processador routes
router.post("/processadores", processadorController.create);
router.get("/processadores", processadorController.getAll);
router.get("/processadores/:id", processadorController.getById);
router.put("/processadores/:id", processadorController.update);


// Teclado routes
router.post("/teclados", tecladoController.create);
router.get("/teclados", tecladoController.getAll);
router.get("/teclados/:id", tecladoController.getById);
router.put("/teclados/:id", tecladoController.update);


// Descarte routes
router.post("/descartes", descarteController.create);
router.get("/descartes/:id", descarteController.read);
router.put("/descartes/:id", descarteController.update);
router.delete("/descartes/:id", descarteController.delete);


// Doacao routes
router.post("/doacoes", doacaoController.create);
router.get("/doacoes/:id", doacaoController.read);
router.put("/doacoes/:id", doacaoController.update);
router.delete("/doacoes/:id", doacaoController.delete);
router.get('/doacoes', doacaoController.readAll);


// DoacaoUsuario routes
router.post("/doacoesUsuarios", doacaoUsuarioController.create);
router.get("/doacoesUsuarios/:id", doacaoUsuarioController.read);
router.put("/doacoesUsuarios/:id", doacaoUsuarioController.update);
router.delete("/doacoesUsuarios/:id", doacaoUsuarioController.delete);
router.get('/doacoesUsuarios/:userId/:userType', doacaoUsuarioController.getDoacoes);
router.get("/doacoesUsuarios", doacaoUsuarioController.readAll);



// Rotas para SolicitacaoController
router.post("/solicitacoes", solicitacaoController.create);
router.get("/solicitacoes/:id", solicitacaoController.read);
router.put("/solicitacoes/:id", solicitacaoController.update);
router.delete("/solicitacoes/:id", solicitacaoController.delete);
router.get('/solicitacoes/:userId/:userType', solicitacaoController.getSolicitacoes);
router.get("/solicitacoes", solicitacaoController.readAll);


export { router };