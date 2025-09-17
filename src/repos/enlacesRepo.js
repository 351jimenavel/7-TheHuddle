const db = require("../db.js");

function listByTema(temaId){
    return db.prepare(`SELECT * FROM enlaces 
        WHERE tema_id = ? 
        ORDER BY created_at DESC`).all();
}