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
    const descripcionOk = descripcionLimpia || "";

    const tituloLimpio = titulo.trim();
    const tituloOk = tituloLimpio || "";

    if (tituloOk === '' || tituloOk.length > 120){
        return {error:"Titulo demasiado largo"}
    };

    const nuevoTema = db.prepare(`
    INSERT INTO temas (titulo, descripcion)
    VALUES (?, ?);
    `);
    const id_nuevo = nuevoTema.run(tituloOk, descripcionOk);
    const temaCreado = obtenerTema(id_nuevo.lastInsertRowid);
    return temaCreado;
}

function getById(id){
    return db.prepare(`SELECT * FROM temas WHERE id = ?`).get(Number(id)) || null;
}

function update(id,{titulo, descripcion}){
    const tema = getById(id);
    if (!tema){
        throw new Error('NOT_FOUND');
    }

    const tituloOk = titulo.trim();
    const descripcionOk = descripcion.trim() || "";

    if (tituloOk === ""){
        throw new Error('BAD_REQUEST');
    }
    
    const info = db.prepare(`
    UPDATE temas SET titulo = ?, descripcion = ? WHERE id = ?
    `).run(tituloOk, descripcionOk, Number(id));
    return getById(id)
}

function remove(id){
    const info = db.prepare(`DELETE FROM temas WHERE id = ?`).run(Number(id));
    return info.changes; // 0 o 1
}

function vote(id){
    const tema = getById(id);

    if (!tema === ""){
        throw new Error('NOT_FOUND');
    }

    const incrementar = db.prepare(`UPDATE temas SET votos = votos + 1 WHERE id = ?`).run(Number(id));
    return getById(incrementar); // para leer el nuevo total
}

module.exports = { listWithVoteCountOrdenado, create, getById, update, remove, vote };