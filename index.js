import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/UsuarioRouter.js';
import placeRouter from './routes/PlaceRouter.js';

connectDB();
const app = express();
app.use(express.json());
dotenv.config();

const domininiosPermitidos = ['http://localhost:5000', 'http://localhost:5174', 'http://localhost:5173' ];

const corsOptions = {
    origin: (origin, callback) => {
        if(domininiosPermitidos.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Dominio no permitido'));
        }
    }
}

app.use(cors(corsOptions));


app.use('/api/usuarios', usuarioRouter);
app.use('/api/lugares', placeRouter);






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});