import { useMutation } from "@tanstack/react-query";
import { logout } from "@/supabase/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { MutationKeys } from "@/types/mutationKeys.enum";

type UseLogoutOptions = {
  onLogoutSuccess?: () => void;
};

export const useLogout = (options?: UseLogoutOptions) => {
  const [, setUser] = useAtom(userAtom);
  
  return useMutation({
    mutationKey: [MutationKeys.LOGOUT],
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      options?.onLogoutSuccess?.();
    },
  });
};
