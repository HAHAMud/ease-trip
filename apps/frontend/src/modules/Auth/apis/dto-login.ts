export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
