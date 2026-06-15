import express, {Application,Request,Response} from 'express';
import cors from 'cors';
import apiRouter from './routes/index.router.js';

const app:Application = express();
app.use(
  express.json({
    type: (req) => {
      const contentType = req.headers['content-type'] ?? '';
      if (!contentType && req.method === 'POST') return true;
      return /json|^text\/plain$/i.test(contentType);
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', apiRouter)

export default app;