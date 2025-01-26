import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { AUTH_PATHS } from "../index.enum";
import RegisterGuard from "@/components/route-guards/register";

const Login = lazy(() => import("@/pages/login"));

export const AUTH_LOGIN_ROUTE = [
  <Route
    key="login"
    path={AUTH_PATHS.LOGIN}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterGuard>
          <Login />
        </RegisterGuard>
      </Suspense>
    }
  />,
];
