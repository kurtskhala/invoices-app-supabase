import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { AUTH_PATHS } from "../index.enum";
import RegisterGuard from "@/components/route-guards/register";

const Register = lazy(() => import("@/pages/register"));

export const AUTH_REGISTER_ROUTE = [
  <Route
    key="register"
    path={AUTH_PATHS.REGISTER}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterGuard>
          <Register />
        </RegisterGuard>
      </Suspense>
    }
  />,
];
