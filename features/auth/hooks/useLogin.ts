import { useMutation } from "@tanstack/react-query";
import { login } from "../services/api";
import { storage } from "@/lib/storage";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
