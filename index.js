import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/UsuarioRouter.js';
import placeRouter from './routes/PlaceRouter.js';
import adminRouter from './routes/adminRouter.js';

import { corsOptions } from './config/cors.js';


connectDB();
const app = express();
app.use(express.json());
dotenv.config();

// Configurar CORS

app.use(cors(corsOptions));



app.use('/api/usuarios', usuarioRouter);
app.use('/api/lugares', placeRouter);
// Para el admin
app.use('/api/admin', adminRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});