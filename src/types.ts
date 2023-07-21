export type LoginFormBody = {
  email: string;
  password: string;
};

export type SignupFormBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type StoreTaskType = {
  title: string;
  description: string;
  priority: string;
};

export type UpdateTaskType = {
  id: string;
  title: string;
  description: string;
  priority: string;
};
