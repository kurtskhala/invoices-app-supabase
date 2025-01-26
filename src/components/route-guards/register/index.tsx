import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const RegisterGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);
  const params = useParams();
  const lang = params.lang as string;
  if (user) {
    return <Navigate to={`/${lang}/invoices`} />;
  }
  return children || <Outlet />;
};

export default RegisterGuard;
