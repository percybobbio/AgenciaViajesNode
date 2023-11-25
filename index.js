import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Conectar a la bd
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.error(error))

//Definir el puerto
const port = process.env.PORT || 4000;


//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual poner next para que siga a la siguiente middleware
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
})

//Agregar bodyparser para leer datos del formulario
app.use(express.urlencoded({extended : true}));

//Definir la carpeta publica
app.use(express.static('public'));
app.use('/viajes', express.static('public'));


//Agregar router
app.use('/', router);

app.listen(port, ()=>{
console.log(`El servidor esta corriendo en el puerto ${port}`);
})