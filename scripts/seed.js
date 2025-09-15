import db from '../src/db.js';

// Crear tabla TEMAS
db.exec(`
    CREATE TABLE IF NOT EXISTS temas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    votos INTEGER NOT NULL DEFAULT 0,
    descripcion TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);

// Crear tabla ENLACES (pertenece a un tema)
db.exec(`
    CREATE TABLE IF NOT EXISTS enlaces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    url TEXT NOT NULL,
    votos INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tema_id) REFERENCES temas(id) ON DELETE CASCADE
    );
    `);


// Insertar datos de ejemplos (Temas)
const insertTema = db.prepare(`
    INSERT INTO temas (titulo, descripcion)
    VALUES (?, ?);
`);

// Insertar datos de ejemplos (Enlaces por tema)
const insertEnlace = db.prepare(`
INSERT INTO enlaces (tema_id, titulo, url)
VALUES (?, ?, ?);
`);

// TEMAS Y ENLACES DE PRUEBA
const temas = [
    { titulo: 'Modo oscuro en la app', descripcion: 'Propuesta para agregar dark mode en la interfaz.' },
    { titulo: 'Atajos de teclado', descripcion: 'Mejorar productividad con combinaciones rápidas.' },
    ];

const temaIds = temas.map(t => insertTema.run(t.titulo, t.descripcion).lastInsertRowid);
// Tema 1 – Modo oscuro
insertEnlace.run(temaIds[0], 'Artículo sobre dark mode UX', 'https://uxdesign.cc/dark-mode-ux-best-practices');
insertEnlace.run(temaIds[0], 'Ejemplo de dark theme en GitHub', 'https://github.blog/news-insights/product-news/dark-mode/');

// Tema 2 – Atajos
insertEnlace.run(temaIds[1], 'Cheatsheet de VSCode', 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf');
insertEnlace.run(temaIds[1], 'Tips de productividad con atajos', 'https://www.smashingmagazine.com/keyboard-shortcuts-productivity');

// Mostrar en consola
console.log('Seed completado: tablas creadas y datos insertados');