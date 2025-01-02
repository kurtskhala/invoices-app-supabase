import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { AUTH_PATHS } from "../index.enum";

const Login = lazy(() => import("@/pages/login"));

export const AUTH_LOGIN_ROUTE = [
  <Route
  key="login"
    path={AUTH_PATHS.LOGIN}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    }
  />,
];
