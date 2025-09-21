// Configuracion basica
const express = require('express')
const path = require('path');

// Routers de temas y enlaces
const temasRouter = require('./src/routes/temas');
const enlacesRouter = require('./src/routes/enlaces');

// Inicializar app
const app = express()
const port = 3000;

// Configuracion de motor de vistas y carpetas
app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));// Indica a Express dónde encontrar los archivos de plantilla
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.urlencoded({ extended: true }));    // middleware, permite leer datos de formularios enviados por POST.

// Montar routers
app.use(temasRouter);
app.use(enlacesRouter);

// Levantar servidor
app.listen(port, () => {
    console.log("Servidor corriendo en puerto", `http://localhost:${port}/temas`);
});
