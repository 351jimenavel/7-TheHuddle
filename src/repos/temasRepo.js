const db = require("../db.js");

// FUNCION listWithVoteCountOrdenado():
function listWithVoteCountOrdenado(){
    const row = db.prepare(`SELECT * 
        FROM temas 
        ORDER BY votos DESC, created_at DESC`).all();
    return row
}

function obtenerTema(id){
    return db.prepare(`SELECT * FROM temas WHERE id = ?`).get(Number(id))
}

function create({titulo, descripcion}){
    const descripcionLimpia = descripcion.trim();
    const descripcion = descripcionLimpia || "";

    const tituloLimpio = descripcion.trim();
    const titulo = tituloLimpio || "";

    if (titulo === '' || titulo.length > 120){
        return {error:"Titulo demasiado largo"}
    };

    const nuevoTema = db.prepare(`
    INSERT INTO temas (titulo, descripcion)
    VALUES (?, ?);
    `);
    const id_nuevo = nuevoTema.lastInsertRowid;
    const temaCreado = obtenerTema(id_nuevo);
    return temaCreado;
}

module.exports = { listWithVoteCountOrdenado, create };