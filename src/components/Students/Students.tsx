// src/components/Students/Students.tsx
'use client';
import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student'; // ← импортируем новый компонент
import styles from './Student.module.scss'; // или создайте Students.module.scss, если нужно

const Students = (): React.ReactElement => {
  const { students, removeStudent } = useStudents(); // ← предполагаем, что хук возвращает removeStudent

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={removeStudent} // ← передаём функцию удаления
        />
      ))}
    </div>
  );
};

export default Students;
