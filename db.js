import Database from 'better-sqlite3';
export const db = new Database('db.db');

db.prepare('CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY, author TEXT, title TEXT, category TEXT, content TEXT, createdAt DATE, changedAt DATE)').run();