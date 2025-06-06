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
import CoordenadorController from "../Controllers/Usuarios/CoordenadorController";
import MissaoController from "../Controllers/Missao/MissaoController";
import ImagemController from "../Controllers/Imagem/ImagemController";
import DataController from "../Controllers/Data/DataController";
import RelatorioController from "../Controllers/Relatorio/RelatorioController";
import MouseController from "../Controllers/Eletronicos/MouseController";

import upload from "../middlewares/upload";


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
const coordenadorController = new CoordenadorController();
const imagemController = new ImagemController();
const dataController = new DataController();
const relatorioController = new RelatorioController();
const missaoController = new MissaoController();
const mouseController = new MouseController();

// Coordenador routes

router.get("/coordenadores", coordenadorController.getAll);
router.get("/coordenadores/:id", coordenadorController.getById);
router.post("/coordenadores/forgot-password", coordenadorController.forgotPassword);
router.post("/coordenadores", coordenadorController.create);
router.post("/coordenadores/verify", (req, res) => coordenadorController.verifyEmailAndPassword(req, res));
router.put("/coordenadores/:id", coordenadorController.updatePassword);
router.delete("/coordenadores/:id", coordenadorController.delete);


// Aluno routes
router.get("/alunos", alunoController.list);
router.get("/alunos/:id", alunoController.read);
router.get('/alunos/matricula/:matricula', alunoController.getByMatricula);
router.post("/alunos/forgot-password", alunoController.forgotPassword);
router.post("/alunos", alunoController.create);
router.post("/alunos/verify", alunoController.verifyCredentials);
router.put("/alunos/:id", alunoController.updateCargo);
router.put("/alunos/senha/:id", alunoController.update);
router.delete("/alunos/:id", alunoController.delete);


// Missão routes
router.post("/missoes", missaoController.create);
router.get("/missoes", missaoController.getAll);
router.get("/missoes/usuario/:usuarioId", missaoController.getByUserId);
router.get("/missoes/:id", missaoController.getById);
router.put("/missoes/:id", missaoController.update);
router.delete("/missoes/:id", missaoController.delete);



// Pessoa Fisica routes
router.post("/pessoasFisicas", pessoaFisicaController.create);
router.get("/pessoasFisicas", pessoaFisicaController.getAll);
router.get("/pessoasFisicas/names", pessoaFisicaController.getAllByName);
router.post("/pessoaFisicas/forgot-password", pessoaFisicaController.forgotPassword);
router.post("/pessoasFisicas/verify", pessoaFisicaController.verifyCredentials);
router.get("/pessoasFisicas/:id", pessoaFisicaController.read);
router.put("/pessoaFisicas/:id", upload.single("comprovanteDeBaixaRenda"), pessoaFisicaController.update);
router.delete("/pessoasFisicas/:id", pessoaFisicaController.delete);

//imagem routes
router.post("/imagens", upload.single("image"), (req, res) =>
  imagemController.create(req, res)
);
router.get("/imagens", imagemController.getAll);
router.get("/imagens/mouse/:id", imagemController.getByMouseId);
router.get("/imagens/estabilizado/:id", imagemController.getByEstabilizadorId);
router.get("/imagens/monitor/:id", imagemController.getByMonitorId);
router.get("/imagens/placaMae/:id", imagemController.getByPlacaMaeId);
router.get("/imagens/hd/:id", imagemController.getByHdId);
router.get("/imagens/notebook/:id", imagemController.getByNotebookId);
router.get("/imagens/impressora/:id", imagemController.getByImpressoraId);
router.get("/imagens/gabinete/:id", imagemController.getByGabineteId);
router.get("/imagens/fonteDeAlimentacao/:id", imagemController.getByFonteDeAlimentacaoId);
router.get("/imagens/teclado/:id", imagemController.getByTecladoId);
router.get("/imagens/processador/:id", imagemController.getByProcessadorId);
router.get("/imagens/:id", imagemController.getById);
router.put("/imagens/:id", imagemController.update);
router.delete("/imagens/:id", imagemController.delete);

// Data routes
router.post("/datas", dataController.create);
router.get("/datas", dataController.getAll);
router.get("/datas/:id", dataController.getById);
router.put("/datas/:id", dataController.update);
router.delete("/datas/:id", dataController.delete);

// Relatorio routes
router.post("/relatorios", relatorioController.create);
router.get("/relatorios", relatorioController.getAll);
router.get("/relatorios/usuario/:usuarioId", relatorioController.getByUserId);
router.get("/relatorios/:id", relatorioController.getById);
router.put("/relatorios/:id", relatorioController.update);
router.delete("/relatorios/:id", relatorioController.delete);


// Pessoa Juridica routes
router.post("/pessoasJuridicas", pessoaJuridicaController.create);
router.get("/pessoasJuridicas", pessoaJuridicaController.getAll);
router.get("/pessoasJuridicas/names", pessoaJuridicaController.getAllByName);
router.get("/pessoasJuridicas/:id", pessoaJuridicaController.read);
router.get('/pessoaJuridicas/email/:email', pessoaJuridicaController.getByEmail);
router.post("/pessoasJuridicas/forgot-password", pessoaJuridicaController.forgotPassword);
router.post("/pessoasJuridicas/verify", pessoaJuridicaController.verifyCredentials);
router.put("/pessoasJuridicas/:id", pessoaJuridicaController.update);
router.delete("/pessoasJuridicas/:id", pessoaJuridicaController.delete);




// Inscritos routes
router.get('/inscritos', inscritosController.getAll);
router.get('/inscritos/:id', inscritosController.getById);
router.post('/inscritos', inscritosController.create);
router.put('/inscritos/:id', inscritosController.updateStatus);
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


// Mouse routes
router.get("/mouses", mouseController.getAll);
router.get("/mouses/:id", mouseController.getById);
router.post("/mouses", mouseController.create);
router.put("/mouses/:id", mouseController.update);
router.delete("/mouses/:id", mouseController.delete);
router.get("/mouses/:id/descarte", mouseController.getDescarte);
router.get("/imagens/mouse/:id", imagemController.getByMouseId);



// Descarte routes
router.post("/descartes", descarteController.create);
router.get("/descartes", descarteController.list);
router.get("/descartes/:id", descarteController.read);
router.put("/descartes/:id", descarteController.update);
router.delete("/descartes/:id", descarteController.delete);
router.get("/descartes/:id/teclados", descarteController.getTeclados);
router.get("/descartes/:id/hds", descarteController.getHds);
router.get("/descartes/:id/estabilizadores", descarteController.getEstabilizadores);
router.get("/descartes/:id/monitores", descarteController.getMonitores);
router.get("/descartes/:id/mouses", descarteController.getMouses);
router.get("/descartes/:id/gabinetes", descarteController.getGabinetes);
router.get("/descartes/:id/impressoras", descarteController.getImpressoras);
router.get("/descartes/:id/placasMae", descarteController.getPlacasMae);
router.get("/descartes/:id/notebooks", descarteController.getNotebooks);
router.get("/descartes/:id/processadores", descarteController.getProcessadores);


// Doacao routes
router.post("/doacoes", doacaoController.create);
router.get("/doacoes", doacaoController.readAll);
router.get("/doacoes/:id", doacaoController.read);
router.put("/doacoes/:id", doacaoController.update);
router.delete("/doacoes/:id", doacaoController.delete);

// Rotas para obter eletrônicos de uma doação
router.get("/doacoes/:id/teclados", doacaoController.getTeclados);
router.get("/doacoes/:id/hds", doacaoController.getHds);
router.get("/doacoes/:id/estabilizadores", doacaoController.getEstabilizadores);
router.get("/doacoes/:id/monitores", doacaoController.getMonitores);
router.get("/doacoes/:id/mouses", doacaoController.getMouses);
router.get("/doacoes/:id/gabinetes", doacaoController.getGabinetes);
router.get("/doacoes/:id/impressoras", doacaoController.getImpressoras);
router.get("/doacoes/:id/placas-mae", doacaoController.getPlacasMae);
router.get("/doacoes/:id/notebooks", doacaoController.getNotebooks);
router.get("/doacoes/:id/processadores", doacaoController.getProcessadores);
router.get("/doacoes/:id/fontes", doacaoController.getFontesDeAlimentacao);

// DoacaoUsuario routes
router.post("/doacoesUsuarios", doacaoUsuarioController.create);
router.get("/doacoesUsuarios/:id", doacaoUsuarioController.read);
router.put("/doacoesUsuarios/:id", doacaoUsuarioController.update);
router.delete("/doacoesUsuarios/:id", doacaoUsuarioController.delete);
router.get('/doacoesUsuarios/:userId/:userType', doacaoUsuarioController.getDoacoes);
router.get("/doacoesUsuarios", doacaoUsuarioController.readAll);



// Rotas para SolicitacaoController
router.post("/solicitacoes", solicitacaoController.create);
router.get("/solicitacoes", solicitacaoController.readAll);
router.get("/solicitacoes/:id", solicitacaoController.read);
router.put("/solicitacoes/:id", solicitacaoController.update);
router.delete("/solicitacoes/:id", solicitacaoController.delete);
router.get('/solicitacoes/:userId/:userType', solicitacaoController.getSolicitacoes);



export { router };