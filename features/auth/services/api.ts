import { api } from "@/lib/apiClient";
import { LoginRequest } from "../auth.types";

export async function login(data: LoginRequest) {
  return await api.post("/auth/login", data);
}
