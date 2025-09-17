// IMPORTAR temasRepo
const temasRepo = require('../repos/temasRepo');
const enlacesRepo = require('../repos/enlacesRepo');

// FUNCION getListaTemas(req, res):
function getListaTemas(req, res){
    try{
        const ok = req.query.ok || "";
        const error = req.query.error || "";
        const temas = temasRepo.listWithVoteCountOrdenado();
        res.render('temas/lista', {temas: temas,ok,error});
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
        return res.redirect('/temas?ok=Tema creado correctamente');
    }
    catch(err){
        console.error("postCrearTema error:", err);
        return res.render('temas/nuevo', { ok: "", error: "No se pudo crear el tema.", form: { titulo, descripcion }});
    }
}

function getFormEditarTema(req, res){
    const id = req.params.id;
    const tema = temasRepo.getById(id);
    if (tema){
        return res.render('temas/editar', { ok:"", error:"", id:tema.id, form:{titulo:tema.titulo, descripcion:tema.descripcion} });
    } else {
        return res.redirect('/temas?error=Tema no encontrado');
    }
}

function postEditarTema(req, res){
    const id = req.params.id;
    const titulo = (req.body.titulo || "").trim();
    const descripcion = (req.body.descripcion || "").trim();

    if (titulo === ""){
        return res.render('temas/editar', { ok:"", error:"El título es obligatorio", id, form:{titulo,descripcion} });
    }

    try{
        temasRepo.update(id, {titulo: titulo, descripcion: descripcion});
        return res.redirect('/temas?ok=Tema actualizado');
    }catch(err){
        if (err && err.message === 'NOT_FOUND'){
            return res.redirect('/temas?error=Tema no encontrado');
        }else{
            console.error("postEditarTema error:", err);
            return res.render('temas/editar', { ok:"", error:"No se pudo actualizar", id, form:{titulo,descripcion} });
        }
    }
}

function postEliminarTema(req, res){
    const id = req.params.id;
    const filas = temasRepo.remove(id);

    if (filas === 0){
        return res.redirect('/temas?error=Tema no encontrado');
    }else{
        return res.redirect('/temas?ok=Tema eliminado');
    }
}

// Enlace
function getDetalleTema(req, res){
    const id = req.params.id;
    const tema = temasRepo.getById(id);

    if (!tema){
        return res.redirect('/temas?error=Tema no encontrado');
    }

    const enlaces = enlacesRepo.listByTema(id);
    const ok = req.query.ok || "";
    const error = req.query.error || "";

    return res.render('temas/detalle', { tema, enlaces, ok, error, form: { titulo:"", url:"", descripcion:"" }});
}

// Votar tema
function postVotarTema(req, res){
    const id = req.params.id;

    try{
        const actualizado = temasRepo.vote(id);
        if (actualizado){
            return res.send({ok: true, votos: actualizado.votos, id});
        } else{
            return res.redirect("/temas?ok=Voto registrado");
        }
    }catch(err){
        return res.redirect('/temas?error=Tema no encontrado');
    }
}

module.exports = { getListaTemas, 
    getFormNuevoTema, 
    postCrearTema, 
    getFormEditarTema, 
    postEditarTema, 
    postEliminarTema, 
    getDetalleTema,
    postVotarTema };