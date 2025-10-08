// src/lib/db.ts
import sqlite3 from 'sqlite3';

export const deleteStudentDb = async (id: number): Promise<void> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise<void>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        console.error('❌ Ошибка SQLite при удалении:', err);
        reject(new Error('Database error'));
        return;
      }

      if (this.changes === 0) {
        console.warn(`⚠️ Студент с ID ${id} не найден`);
        reject(new Error('Student not found'));
        return;
      }

      console.log(`✅ Удалён студент с ID ${id}`);
      resolve();
    });
  });
};

// Аналогично для getStudentsDb
export const getStudentsDb = async (): Promise<any[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM student', [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};