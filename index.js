import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/UsuarioRouter.js';
import placeRouter from './routes/PlaceRouter.js';
import adminRouter from './routes/adminRouter.js';

connectDB();
const app = express();
app.use(express.json());
dotenv.config();

// Configurar CORS

console.log(process.env.FRONTEND_URL);

const domininiosPermitidos = [
    'http://localhost:5000', 
    'http://localhost:5173', 
    'https://descrubrecalango.vercel.app', 
    process.env.FRONTEND_URL
];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if(domininiosPermitidos.indexOf(origin) !== -1){
//             callback(null, true);
//         }else{
//             callback(new Error('Dominio no permitido'));
//         }
//     }
// }

// all origins

const corsOptions = {
    origin: (origin, callback) => {
        // Permite solicitudes sin origin (por ejemplo, desde Postman o localhost)
        if (!origin || domininiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Dominio no permitido'));
        }
    }
};


app.use(cors(corsOptions));




app.use('/api/usuarios', usuarioRouter);
app.use('/api/lugares', placeRouter);
// Para el admin
app.use('/api/admin', adminRouter);






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});