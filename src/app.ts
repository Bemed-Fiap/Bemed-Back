import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import env from 'dotenv';
env.config();

const app = express();
const PORT = process.env.PORT || 9978;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(~~PORT, () => console.log(`Server is up and listening port ${PORT}`));

