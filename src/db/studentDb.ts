import sqlite3 from 'sqlite3';
import type StudentInterface from '@/types/StudentInterface';

export const deleteStudentDb = async (id: number): Promise<void> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise<void>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(new Error('Database error'));
        return;
      }

      if (this.changes === 0) {
        reject(new Error('Student not found'));
        return;
      }
      resolve();
    });
  });
};

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

export const addStudentDb = async (student: Omit<StudentInterface, 'id'>): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise((resolve, reject) => {
    const { last_name, first_name, middle_name, groupId } = student;
    const query = `
      INSERT INTO student (last_name, first_name, middle_name, groupId)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [last_name, first_name, middle_name, groupId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};