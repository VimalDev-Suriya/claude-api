import 'dotenv/config.js';
import express from 'express';
import { PORT } from './env';
import routes from './routes';

const app = express();

app.use(express.json()); // to accept the json payload
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
