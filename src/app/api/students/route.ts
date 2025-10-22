import { getStudentsDb, addStudentDb } from '@/db/studentDb';
import { NextRequest } from 'next/server';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();

  const id = await addStudentDb({
    uuid: body.uuid,
    lastName: body.lastName,
    firstName: body.firstName,
    middleName: body.middleName,
    contacts: body.contacts,
    groupId: body.groupId,
  });

  return new Response(
    JSON.stringify({
      id,
      uuid: body.uuid,
      lastName: body.last_name,
      firstName: body.first_name,
      middleName: body.middle_name,
      contacts: body.contacts,
      groupId: body.groupId,
    }),
    {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
