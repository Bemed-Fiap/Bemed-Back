import express from 'express';
import { TokenService } from './../services/token.service';

const routes = express.Router();
const _tokenService = new TokenService();

routes.get('/', async (req, res) => {
    return res.send('Hello Bemed');
});

routes.get('/auth', async (req, res) => {
    const tokenGenerated = await _tokenService.Generate(['michel', 'mail@mail.com']);
    const tokenRecovered = await _tokenService.DecifrarToken(tokenGenerated);
    return res.json({
        tokenGenerated,
        tokenRecovered
});
  
export default routes;
