const db = require("../db.js");

function listByTema(temaId){
    return db.prepare(`SELECT * FROM enlaces 
        WHERE tema_id = ? 
        ORDER BY created_at DESC`).all();
}

function getById(id){
    return db.prepare(`SELECT * FROM enlaces WHERE id = ?`).get(Number(id));
}

function create({tema_id, titulo, url, descripcion}){
    const descripcionLimpia = descripcion.trim();
    const descripcionOk = descripcionLimpia || "";

    const tituloLimpio = titulo.trim();
    const tituloOk = tituloLimpio || "";

    if (tituloOk === '' || tituloOk.length > 120){
        return {error:"Titulo demasiado largo"}
    };

    if (!Number.isNaN(tema_id)){
        return {error:"El id del tema debe ser un numero"}
    }

    const enlace = db.prepare(`
    INSERT INTO enlaces (tema_id, titulo, url, descripcion)
    VALUES (?, ?, ?, ?);
    `);
    const id_nuevo = enlace.run(tema_id, tituloOk, url, descripcionOk);
    const enlaceCreado = getById(id_nuevo.lastInsertRowid);
    return enlaceCreado;
}

function update(id, {titulo, url, descripcion}){
    const enlaceActual = getById(id);
    if (!enlaceActual){
        throw new Error('NOT_FOUND');
    }

    const tituloOk = titulo.trim();
    const descripcionOk = descripcion.trim() || "";

    if (tituloOk === ""){
        throw new Error('BAD_REQUEST');
    }
    
    const info = db.prepare(`
    UPDATE enlaces SET titulo = ?, url = ?, descripcion = ? WHERE id = ?
    `).run(tituloOk, url , descripcionOk, Number(id));
    return getById(id)
}

function remove(id){
    const info = db.prepare(`DELETE FROM enlaces WHERE id = ?`).run(Number(id));
    return info.changes; // 0 o 1
}