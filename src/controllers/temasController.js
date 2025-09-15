// IMPORTAR temasRepo
const temasRepo = require('../repos/temasRepo');

// FUNCION getListaTemas(req, res):
function getListaTemas(req, res){
    try{
        const temas = temasRepo.listWithVoteCountOrdenado();
        res.render('temas/lista', {temas: temas,ok: "",error: ""});
    }
    catch(err){
        console.error("Error en getListaTemas:", err);
        res.render('temas/lista', {temas: [], ok:"", error: "No se pudo cargar la lista de temas"});
    }
}

function getFormNuevoTema(req, res){
    res.render('/temas/nuevo', {ok:"", error:"", form:{titulo:"",descripcion:""}});
}

function postCrearTema(req, res){
    const data = req.body;
    const titulo = data.titulo;
    const descripcion = data.descripcion;
    // Validacion
    if (titulo == ""){
        res.render('temas/nuevo', {ok:"", error:"El titulo es obligatorio", form:{titulo,descripcion}});
    }
    
    // Llamar a repo
    try{
        const temaNuevo = temasRepo.create({titulo, descripcion});
        res.redirect('/temas');
    }
    catch(err){
        res.render('temas/nuevo', { ok: "", error: "No se pudo crear el tema.", form: { titulo, descripcion }});
    }
}

module.exports = { getListaTemas, getFormNuevoTema };