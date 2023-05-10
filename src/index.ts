import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router';

dotenv.config();

const options = {
  origin: '*',
};

const app = express();
app.use(express.json());
app.use(cors(options));
app.use(router);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
