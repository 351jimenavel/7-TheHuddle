// IMPORTAR temasRepo
const temasRepo = require("../temasRepo.js");

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

module.exports = { getListaTemas };