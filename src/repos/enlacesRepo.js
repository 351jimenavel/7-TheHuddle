const db = require("../db.js");

function listByTema(temaId){
    return db.prepare(`SELECT * FROM enlaces 
        WHERE tema_id = ? 
        ORDER BY created_at DESC`).all(Number(temaId));
}

function getById(id){
    return db.prepare(`SELECT * FROM enlaces WHERE id = ?`).get(Number(id));
}

function create({tema_id, titulo, url, descripcion}){
    const idTema = Number(tema_id);
    
    if (!Number.isNaN(tema_id)){
        throw new Error("BAD_REQUEST"); // id tema inválido
    }

    const tituloOk = (titulo || "").trim();
    const urlOk = (url || "").trim();
    const descOk = (descripcion || "").trim();

    if (tituloOk === "" || urlOk === ""){
        throw new Error("BAD_REQUEST"); // datos incompletos
    };

    const enlace = db.prepare(`
    INSERT INTO enlaces (tema_id, titulo, url, descripcion)
    VALUES (?, ?, ?, ?);
    `);
    const id_nuevo = enlace.run(idTema, tituloOk, urlOk, descOk);
    const enlaceCreado = getById(id_nuevo.lastInsertRowid);
    return enlaceCreado;
}

function update(id, {titulo, url, descripcion}){
    const enlaceActual = getById(id);
    if (!enlaceActual){
        throw new Error('NOT_FOUND');
    }

    const tituloOk = (titulo || "").trim();
    const urlOk = (url || "").trim();
    const descOk = (descripcion || "").trim();

    if (tituloOk === "" || urlOk === ""){
        throw new Error('BAD_REQUEST');
    }
    
    const info = db.prepare(`
    UPDATE enlaces SET titulo = ?, url = ?, descripcion = ? WHERE id = ?
    `).run(tituloOk, urlOk , descOk, Number(id));
    return getById(info.id)
}

function remove(id){
    const info = db.prepare(`DELETE FROM enlaces WHERE id = ?`).run(Number(id));
    return info.changes; // 0 o 1
}

module.exports = { listByTema, create, getById, update, remove };