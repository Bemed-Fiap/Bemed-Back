import express from 'express';
import TokenMiddleware from './../middleware/token.middleware';
import UsuarioController from '../controllers/usuario.controller';
import ProdutoController from '../controllers/produto.controller';
import LoginController from '../controllers/login.controller';
import FarmaciaController from '../controllers/Farmacia.controller';
import TransacaoController from '../controllers/transacao.controller';

const routes = express.Router();

const _usuario = new UsuarioController();
const _produto = new ProdutoController();
const _login = new LoginController();
const _farmacia = new FarmaciaController();
const _transacao = new TransacaoController();

const _tokenMiddleware = new TokenMiddleware();

routes.get('/', async (req, res) => { return res.send('Hello Bemed, I\'m working ♥'); });

routes.get('/usuario/', _tokenMiddleware.Validate, _usuario.GetMe); // usuario logado
routes.get('/farmacia/', _tokenMiddleware.Validate, _farmacia.GetMe); //farmacia logada

routes.get('/usuarios/', _usuario.Get); //buscar todos
routes.get('/usuario/:id', _usuario.Get); //buscar um
routes.get('/usuarios/:id', _usuario.Get); //buscar um

routes.get('/farmacias/', _tokenMiddleware.Validate, _farmacia.Get); //buscar todos
routes.get('/farmacia/:id', _tokenMiddleware.Validate, _farmacia.Get); //buscar um
routes.get('/farmacias/:id', _tokenMiddleware.Validate, _farmacia.Get); //buscar um

routes.post('/farmacia', _farmacia.Post);
routes.post('/farmacias', _farmacia.Post);

routes.get('/produto/', _tokenMiddleware.Validate, _produto.Get);
routes.get('/produtos/', _tokenMiddleware.Validate, _produto.Get);

routes.get('/produto/:id', _tokenMiddleware.Validate, _produto.Get);
routes.get('/produtos/:id', _tokenMiddleware.Validate, _produto.Get);

routes.post('/produto', _tokenMiddleware.Validate, _produto.Post);
routes.post('/produtos', _tokenMiddleware.Validate, _produto.Post);

routes.post('/login', _login.Post);
routes.post('/signup', _usuario.Post);

routes.get('/desconto', _tokenMiddleware.Validate, _transacao.VerDesconto);
routes.post('/devolucao', _tokenMiddleware.Validate, _transacao.EfetivarTransacaoDevolucao);
routes.post('/desconto', _tokenMiddleware.Validate, _transacao.AprovarDesconto);

routes.get('/tokentest', _tokenMiddleware.Validate, _tokenMiddleware.TestRoute);

export default routes;
