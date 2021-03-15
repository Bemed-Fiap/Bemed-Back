import express from 'express';
import { UsuarioService } from './../services/usuario.service';
import { LoginService } from './../services/login.service';
import { TokenMiddleware } from './../middleware/token.middleware';

const routes = express.Router();
const _usuarioService = new UsuarioService();
const _loginService = new LoginService();
const _tokenMiddleware = new TokenMiddleware();

routes.get('/', async (req, res) => {
    return res.send('Hello Bemed');
});

routes.get('/usuario/', _usuarioService.Get);
routes.get('/usuario/:id', _usuarioService.Get);
routes.post('/usuario', _usuarioService.Post);

routes.post('/login', _loginService.Login);

routes.get('/tokentest', _tokenMiddleware.Validate, async (req, res) => {
    return res.json({ congrats: 'You are in!' });
});

export default routes;
