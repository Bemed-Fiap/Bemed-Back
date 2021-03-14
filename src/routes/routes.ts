import express from 'express';
import { MongoConnection } from './../database/connection';

const routes = express.Router();

routes.get('/', async (req, res) => {
    return res.send('Hello Bemed');
});

routes.get('/mongo', async (req, res) => {
    const _usuario = new MongoConnection('usuario');
    await _usuario.Connect();
    const usuarioInserido = await _usuario.Insert({ nome: 'michel 2', sobrenome: ':)' });
    const todos = await _usuario.All();
    await _usuario.Close();
    return res.json({ 
        usuarioInserido,
        todos
    });
});

export default routes;
