'use client';
import useStudents from '@/hooks/useStudents';
import AddStudentForm from './AddStudent';
import Student from './Student';

const StudentsClient = () => {
  const { students = [], isLoading, removeStudent, addStudent, isAdding } = useStudents();

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div>
      <AddStudentForm onAdd={addStudent} isAdding={isAdding} />
      <div>
        {students.map((student) => (
          <Student key={student.id} student={student} onDelete={removeStudent} />
        ))}
      </div>
    </div>
  );
};

export default StudentsClient;