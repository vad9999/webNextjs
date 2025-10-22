'use client'
import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  return (
    <div className={`${styles.Student}`}>
      {student.lastName}
      {' '}
      {student.firstName}
      {' '}
      {student.middleName}
      {' '}
      {student.contacts}
      {' '}
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;
