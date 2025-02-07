import http from "../http";

export interface LoginRequest {
  username: string;
  password: string;
}

export const AdminAPI = {
  login: async (loginRequest: LoginRequest): Promise<void> => {
    await http.post("/login", loginRequest);
  },
  logout: async (): Promise<void> => {
    await http.post("/logout", null);
  },
};
