import { useMutation } from "@tanstack/react-query";
import { login } from "@/supabase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { MutationKeys } from "@/types/mutationKeys.enum";
import { AuthCredentials, LoginResponse } from "@/types/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const params = useParams();
  const lang = params.lang as string;

  return useMutation<LoginResponse, Error, AuthCredentials>({
    mutationKey: [MutationKeys.LOGIN],
    mutationFn: async (credentials: AuthCredentials) => {
      const response = await login(credentials);

      if (!response.data.user || !response.data.session) {
        throw new Error("Login failed");
      }

      return {
        user: response.data.user,
        session: response.data.session,
      };
    },
    onSuccess: () => {
      navigate(`/${lang}/invoices/`);
    },
  });
};
