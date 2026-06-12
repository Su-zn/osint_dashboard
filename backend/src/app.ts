import express, {Application,Request,Response} from 'express';
import cors from 'cors';
import router from './routes/index.router.js';

const app:Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1', router)

export default app;