const temasRepo = require('../repos/temasRepo');
const enlacesRepo = require('../repos/enlacesRepo');

function postCrearEnlace(req, res){
    const temaIdRaw = req.params.id;
    const temaId = Number(temaIdRaw);

    const { titulo = "", url = "",descripcion = "" } = req.body || {};
    const tituloTrim = titulo.trim();
    const urlTrim = url.trim();
    const descripcionTrim = descripcion.trim();

    // Logs de diagnóstico
    console.log('[postCrearEnlace] Agregado -->', 'temaId:', temaId, 'titulo:', tituloTrim, 'url:', urlTrim);

    // Validaciones del controller (evitan BAD_REQUEST del repo)
    if (!Number.isFinite(temaId) || temaId <= 0) {
        return res.redirect(`/temas/${temaIdRaw || ''}?error=Tema inválido`);
    }

    if (tituloTrim === "" || urlTrim === ""){
        return res.redirect(`/temas/${temaId}?error=Datos invalidos`);
    }

    try{
        enlacesRepo.create({tema_id: temaId, titulo: tituloTrim, url: urlTrim, descripcion:descripcionTrim});
        return res.redirect(`/temas/${temaId}?ok=Enlace creado`);
    }catch(err){
        if (err.message === 'CONFLICT'){
            return res.redirect(`/temas/${temaId}?error=Ya existe un enlace con esa URL`);
        }
        console.error("postCrearEnlace error:", err);
        return res.redirect(`/temas/${temaId}?error=No se pudo crear el enlace`);
    }
}

function getFormEditarEnlace(req, res){
    const id = req.params.id;
    const enlace = enlacesRepo.getById(id);

    if (!enlace){
        return res.redirect('/temas?error=Enlace no encontrado');
    }
    // Logs de diagnostico
    console.log('[getFormEditarEnlace] Editando -->', 'specs:', enlace);

    return res.render('enlaces/editar', { ok:"", error:"", id:enlace.id, temaId: enlace.tema_id, form:{titulo:enlace.titulo, url: enlace.url,descripcion:enlace.descripcion} });

}

function postEditarEnlace(req, res){
    const id = req.params.id;
    const actual = enlacesRepo.getById(id); // conocer temaId para redirigir
    if (!actual){
        return res.redirect('/temas?error=Enlace no encontrado');
    }

    const temaId = actual.tema_id;
    const titulo = (req.body.titulo || "").trim();
    const url = (req.body.url || "").trim();
    const descripcion = (req.body.descripcion || "").trim();

    if (titulo === "" || url === ""){
        return res.render('enlaces/editar', { ok:"", error:"Datos inválidos", id, temaId, form:{titulo,url,descripcion} });
    }

    try{
        enlacesRepo.update(id, {titulo: titulo, url:url ,descripcion: descripcion});
        // Logs de diagnostico
        console.log('[postEditarEnlace] Editado -->', 'specs:', {titulo: titulo, url:url ,descripcion: descripcion});
        return res.redirect(`/temas/${temaId}?ok=Enlace actualizado`); // temaId viene del enlace o lo pasás en el form hidden
    }catch(err){
        if (err && err.message === 'NOT_FOUND'){
            return res.redirect('/temas?error=Enlace no encontrado');
        }
        if(err && err.message === 'CONFLICT'){
            return res.render('/enlaces/editar', { ok:"", error:"URL duplicada en este tema", id, temaId, form:{titulo,url,descripcion} });
        }
        
        console.error("postEditarEnlace error:", err);
        return res.render('enlaces/editar', { ok:"", error:"No se pudo actualizar", id, temaId, form:{titulo,url,descripcion} });
    }
}

function postEliminarEnlace(req, res){
    const id = req.params.id;
    const enlace = enlacesRepo.getById(id);

    if (!enlace){
        return res.redirect('/temas?error=Enlace no encontrado');
    }
    const temaId = enlace.tema_id;
    const filas = enlacesRepo.remove(id);
    // Logs de diagnostico
    console.log('[postEliminarEnlace] Eliminado -->', 'specs:', enlace);
    
    if (filas === 1){
        return res.redirect(`/temas/${temaId}?ok=Enlace eliminado`);
    }else{
        return res.redirect(`/temas/${temaId}?error=No se pudo eliminar`);
    }

}

// Votos
function postVotarEnlace(req, res){
    const id = req.params.id;
    const enlace = enlacesRepo.getById(id);
    const temaId = enlace.tema_id;

    if (!enlace){
        return res.redirect('/temas?error=Enlace no encontrado');
    }

    // Logs de diagnostico
    console.log('[postVotarEnlace] Voto -->', 'enlaceId:', id);
    try{
        const actualizado = enlacesRepo.vote(id);
        if (actualizado){
            return res.send({ok: true, votos: actualizado.votos, id});
        } else{
            return res.redirect(`/temas/${temaId}?ok=Voto registrado`);
        }
    }catch(err){
        return res.redirect('/temas?error=Tema no encontrado');
    }
}

module.exports = { postCrearEnlace, getFormEditarEnlace, postEditarEnlace, postEliminarEnlace, postVotarEnlace};