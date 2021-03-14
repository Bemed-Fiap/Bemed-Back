import express from 'express';
const routes = express.Router();

routes.get('/', async (req, res) => {
    return res.send('Hello Bemed');
});

export default routes;
