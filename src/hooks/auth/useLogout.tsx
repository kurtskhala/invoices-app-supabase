import { useMutation } from "@tanstack/react-query";
import { logout } from "@/supabase/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { MutationKeys } from "@/types/mutationKeys.enum";
import { useNavigate, useParams } from "react-router-dom";

type UseLogoutOptions = {
  onLogoutSuccess?: () => void;
};

export const useLogout = (options?: UseLogoutOptions) => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const params = useParams();
  const lang = params.lang as string;

  return useMutation({
    mutationKey: [MutationKeys.LOGOUT],
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      navigate(`/${lang}/signin/`);
      options?.onLogoutSuccess?.();
    },
  });
};
