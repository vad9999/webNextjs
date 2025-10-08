// src/lib/db.ts
import sqlite3 from 'sqlite3';
import path from 'path';

// Путь к БД (абсолютный)
const DB_PATH = path.resolve(process.cwd(), 'db', 'vki-web.db');

// Глобальная переменная для singleton (чтобы не создавать новое соединение при каждом хот-релоаде в dev)
let dbInstance: sqlite3.Database | null = null;

export const getDb = (): sqlite3.Database => {
  if (dbInstance) {
    return dbInstance;
  }

  // Включаем verbose для отладки (опционально)
  sqlite3.verbose();

  dbInstance = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('❌ Не удалось открыть БД:', err);
      throw err;
    }
    console.log('✅ Соединение с БД установлено');
  });

  // Настройка: увеличить таймаут ожидания (по умолчанию 0 = не ждать)
  dbInstance.configure('busyTimeout', 5000); // ждать до 5 секунд

  return dbInstance;
};

// Экспортируем функции работы с БД
export const deleteStudentDb = async (id: number): Promise<void> => {
  const db = getDb();

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
  const db = getDb();
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