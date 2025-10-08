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

const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const { mutate: removeStudent } = useMutation({
    mutationFn: deleteStudent,
    //  Оптимистичное обновление
    onMutate: async (id) => {
      // Отменяем исходящие запросы (например, другие мутации)
      await queryClient.cancelQueries({ queryKey: ['students'] });

      // Сохраняем предыдущую версию данных для отката
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);

      // Обновляем кэш немедленно: удаляем студента
      queryClient.setQueryData<StudentInterface[]>(['students'], (old) =>
        old ? old.filter(student => student.id !== id) : []
      );

      // Возвращаем контекст для отката
      return { previousStudents };
    },
    // Откат в случае ошибки
    onError: (err, id, context) => {
      console.error('Ошибка удаления:', err);
      queryClient.setQueryData(['students'], context?.previousStudents);
    },
    // Обновление после успеха (на всякий случай)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return { students, isLoading, removeStudent };
};

export default useStudents;