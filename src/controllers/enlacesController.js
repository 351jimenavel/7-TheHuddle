const temasRepo = require('../repos/temasRepo');
const enlacesRepo = require('../repos/enlacesRepo');

function postCrearEnlace(req, res){
    const temaId = req.params.id;

    const { titulo = "", url = "",descripcion = "" } = req.body || {};
    const tituloTrim = titulo.trim();
    const urlTrim = url.trim();
    const descripcionTrim = descripcion.trim();

    if (tituloTrim === ""){
        return res.redirect('/temas/:id?error=Datos invalidos');
    }

    try{
        enlacesRepo.create({tema_id: temaId, titulo: tituloTrim, url: urlTrim, descripcion:descripcionTrim});
        return res.redirect('/temas/:id?ok=Enlace creado');
    }catch(err){
        if (err.message === 'CONFLICT'){
            return res.redirect('/temas/:id?error=Ya existe un enlace con esa URL');
        }
        console.error("postCrearEnlace error:", err);
        return res.redirect('/temas/:id?error=No se pudo crear el enlace');
    }
}