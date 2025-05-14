import express from 'express';
import db from './config/db.js';
import cookieParser from 'cookie-parser';


import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'


// creamos la app
const app = express();


// linea para poder mandar datos por formularios
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// conexion a la base de datos
 try {
     await db.authenticate()
     db.sync();
     console.log("Conexion correcta a la base de datos");
 } catch (error) {
     console.log(error);
 }

//  definir un puerto y arrancar el proyecto
const port = 5000;
app.listen(port, () =>{
    console.log(`La aplicacion esta corriendo en el puerto ${port}`);
});

// carpeta publica
app.use(express.static('public'));

// Rutas 
app.use('/', authRoutes);
app.use('/administrador', adminRoutes)


// habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');