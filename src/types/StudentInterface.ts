interface StudentInterface {
  id: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  contacts?: string;
  groupId: number;
};

export default StudentInterface;