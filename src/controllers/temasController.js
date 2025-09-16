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
    res.render('temas/nuevo', {ok:"", error:"", form:{titulo:"",descripcion:""}});
}

function postCrearTema(req, res){
    const { titulo = "", descripcion = "" } = req.body || {};
    const tituloTrim = titulo.trim();
    const descripcionTrim = descripcion.trim();
    
    // Validacion
    if (titulo === ""){
        return res.render('temas/nuevo', {ok:"", error:"El titulo es obligatorio", form:{titulo,descripcion}});
    }
    
    // Llamar a repo
    try{
        temasRepo.create({titulo: tituloTrim, descripcion: descripcionTrim});
        return res.redirect('/temas');
    }
    catch(err){
        console.error("postCrearTema error:", err);
        return res.render('temas/nuevo', { ok: "", error: "No se pudo crear el tema.", form: { titulo, descripcion }});
    }
}

module.exports = { getListaTemas, getFormNuevoTema, postCrearTema };