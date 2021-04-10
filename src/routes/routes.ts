import express from 'express';
import TokenMiddleware from './../middleware/token.middleware';
import UsuarioController from '../controllers/usuario.controller';
import ProdutoController from '../controllers/produto.controller';
import LoginController from '../controllers/login.controller';
import FarmaciaController from '../controllers/Farmacia.controller';

const routes = express.Router();

const _usuario = new UsuarioController();
const _produto = new ProdutoController();
const _login = new LoginController();
const _farmacia = new FarmaciaController();

const _tokenMiddleware = new TokenMiddleware();

routes.get('/', async (req, res) => { return res.send('Hello Bemed, I\'m working ♥'); });

routes.get('/usuario/', _usuario.Get);
routes.get('/usuarios/', _usuario.Get);

routes.get('/usuario/:id', _usuario.Get);
routes.get('/usuarios/:id', _usuario.Get);

routes.get('/eu', _tokenMiddleware.Validate, _usuario.GetMe);

routes.get('/farmacia/', _tokenMiddleware.Validate, _farmacia.Get);
routes.get('/farmacias/', _tokenMiddleware.Validate, _farmacia.Get);

routes.get('/farmacia/:id', _tokenMiddleware.Validate, _farmacia.Get);
routes.get('/farmacias/:id', _tokenMiddleware.Validate, _farmacia.Get);

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

routes.get('/tokentest', _tokenMiddleware.Validate, _tokenMiddleware.TestRoute);

export default routes;
