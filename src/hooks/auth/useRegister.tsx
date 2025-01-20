import { useMutation } from "@tanstack/react-query";
import { register } from "@/supabase/auth";
import { MutationKeys } from "@/types/mutationKeys.enum";
import { RegisterCredentials } from "@/types/auth";

export const useRegister = () => {
  return useMutation<void, Error, RegisterCredentials>({
    mutationKey: [MutationKeys.REGISTER],
    mutationFn: async (credentials: RegisterCredentials): Promise<void> => {
      const response = await register(credentials);
      if (response.error) {
        throw new Error(response.error.message);
      }
    },
  });
};
