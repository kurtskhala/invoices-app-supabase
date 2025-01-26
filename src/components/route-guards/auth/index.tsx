import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);
  const params = useParams();
  const lang = params.lang as string;
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  if (isWaiting) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={`/${lang}/signIn`} />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
