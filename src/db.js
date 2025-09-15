// INICIAR modulo db
// Conexión SQLite + PRAGMA
const path = require('path');
const Database = require('better-sqlite3');
//   DEFINIR RUTA_ABSOLUTA a "data.db" (archivo SQLite en raíz del proyecto)
const DB_PATH = path.join(__dirname, '..', 'data.db');
//   ABRIR CONEXION a SQLite con ese archivo (crear si no existe)
const db = new Database(DB_PATH);
//   EJECUTAR PRAGMA: foreign_keys = ON
db.pragma("foreing_keys = ON");
//   (Opcional) EJECUTAR PRAGMA performance (journal_mode=WAL, synchronous=NORMAL), si aplica
//   EXPORTAR la conexión para que la usen los repos
module.exports = db;
// FIN modulo db
