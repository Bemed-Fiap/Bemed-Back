import express from 'express';
import { UsuarioService } from './../services/usuario.service';

const routes = express.Router();
const _usuarioService = new UsuarioService();

routes.get('/', async (req, res) => {
    return res.send('Hello Bemed');
});

routes.get('/usuario/', _usuarioService.Get);
routes.get('/usuario/:id', _usuarioService.Get);
routes.post('/usuario', _usuarioService.Post);

export default routes;
