export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  token: string;
  errmessage?: string;
  user_data: {
    id: string;
    email: string;
    username: string;
    gender: string;
    matri_id: string;
    plan_status: string;
  };
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  gender: string;
  matri_id: string;
  plan_status: string;
};
