'use client';
import { useForm } from 'react-hook-form';
import type StudentInterface from '@/types/StudentInterface';

type FormValues = Omit<StudentInterface, 'id'>;

interface AddStudentFormProps {
  onAdd: (data: FormValues) => void;
  isAdding: boolean;
}

const AddStudentForm = ({ onAdd, isAdding }: AddStudentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onAdd(data);
    reset(); // очищаем форму после отправки
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">

      <div className="mb-3">
        <input
          {...register('uuid', { required: 'uuid обязательна' })}
          placeholder="uuid"
          className="border p-2 w-full"
        />
        {errors.uuid && (
          <p className="text-red-500 text-sm">{errors.uuid.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register('lastName', { required: 'Фамилия обязательна' })}
          placeholder="Фамилия"
          className="border p-2 w-full"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register('firstName', { required: 'Имя обязательно' })}
          placeholder="Имя"
          className="border p-2 w-full"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register('middleName', { required: 'Отчество обязательно' })}
          placeholder="Отчество"
          className="border p-2 w-full"
        />
        {errors.middleName && (
          <p className="text-red-500 text-sm">{errors.middleName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          {...register('contacts', { required: 'Контакты обязательно' })}
          placeholder="Контакты"
          className="border p-2 w-full"
        />
        {errors.contacts && (
          <p className="text-red-500 text-sm">{errors.contacts.message}</p>
        )}
      </div>

      <div className="mb-3">
        <input
          type="number"
          {...register('groupId', {
            required: 'ID группы обязателен',
            valueAsNumber: true,
          })}
          placeholder="ID группы"
          className="border p-2 w-full"
        />
        {errors.groupId && (
          <p className="text-red-500 text-sm">{errors.groupId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isAdding}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isAdding ? 'Добавление...' : 'Добавить студента'}
      </button>
    </form>
  );
};

export default AddStudentForm;