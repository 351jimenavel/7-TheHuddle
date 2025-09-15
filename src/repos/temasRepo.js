const db = require("../db.js");

// FUNCION listWithVoteCountOrdenado():
function listWithVoteCountOrdenado(){
    const row = db.prepare(`SELECT * 
        FROM temas 
        ORDER BY votos DESC, created_at DESC`).all();
    return row
}

const result = listWithVoteCountOrdenado();
console.log(result);