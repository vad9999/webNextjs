'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type StudentInterface from '@/types/StudentInterface';

const fetchStudents = async (): Promise<StudentInterface[]> => {
  const res = await fetch('/api/students');
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
};

const deleteStudent = async (id: number): Promise<void> => {
  const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete student');
};

const addStudent = async (newStudent: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStudent),
  });
  if (!res.ok) throw new Error('Failed to add student');
  return res.json();
};

const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const { mutate: removeStudent } = useMutation({
    mutationFn: deleteStudent,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      queryClient.setQueryData<StudentInterface[]>(['students'], (old) =>
        old ? old.filter(student => student.id !== id) : []
      );
      return { previousStudents };
    },
    onError: (err, id, context) => {
      console.error('Ошибка удаления:', err);
      queryClient.setQueryData(['students'], context?.previousStudents);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const { mutate: addStudentMutate, isPending: isAdding } = useMutation({
    mutationFn: addStudent,
    onSuccess: (newStudent) => {
      queryClient.setQueryData<StudentInterface[]>(['students'], (old = []) => [
        ...old,
        newStudent,
      ]);
    },
  });

  return {
    students,
    isLoading,
    removeStudent,
    addStudent: addStudentMutate,
    isAdding,
  };
};

export default useStudents;