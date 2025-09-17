// Configurar Express, el motor EJS, la carpeta views y /public.
const express = require('express')
const path = require('path');

const temasRouter = require('./src/routes/temas');
const enlacesRouter = require('./src/routes/enlaces');

const app = express()
const port = 3000;

app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));// Indica a Express dónde encontrar los archivos de plantilla
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.urlencoded({ extended: true }));

app.use(temasRouter);
app.use(enlacesRouter);

app.listen(port, () => {
    console.log("Servidor corriendo en puerto", `${port}`);
});
