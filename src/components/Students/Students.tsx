'use client';
import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student'; 
import styles from './Student.module.scss'; 

const Students = (): React.ReactElement => {
  const { students, removeStudent } = useStudents(); 

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={removeStudent} 
        />
      ))}
    </div>
  );
};

export default Students;