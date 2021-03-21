import express from 'express';
import UsuarioService from './../services/usuario.service';
import LoginService from './../services/login.service';
import ProdutoService from './../services/produto.service';
import TokenMiddleware from './../middleware/token.middleware';

const routes = express.Router();
const _usuarioService = new UsuarioService();
const _produtoService = new ProdutoService();
const _loginService = new LoginService();
const _tokenMiddleware = new TokenMiddleware();

routes.get('/', async (req, res) => { return res.send('Hello Bemed, I\'m working ♥'); });

routes.get('/usuario/', _usuarioService.Get);
routes.get('/usuario/:id', _usuarioService.Get);
routes.post('/usuario', _usuarioService.Post);

routes.get('/produto/', _tokenMiddleware.Validate, _produtoService.Get);
routes.get('/produto/:id', _tokenMiddleware.Validate, _produtoService.Get);
routes.post('/produto', _tokenMiddleware.Validate, _produtoService.Post);

routes.post('/signin', _loginService.Login);
routes.post('/signup', _usuarioService.Post);

routes.get('/tokentest', _tokenMiddleware.Validate, _tokenMiddleware.TestRoute);

export default routes;
