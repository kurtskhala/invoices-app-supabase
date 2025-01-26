import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_PATHS } from "./auth/index.enum";
import { AUTH_ROUTES } from "./auth";
import { INVOICR_VIEW_ROUTE, SINGLE_INVOICE_VIEW_ROUTE } from "./invoices";
import Layout from "@/layouts/invoices-layout/layout";
import { PROFILE_VIEW_ROUTE } from "./profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={`ka/${AUTH_PATHS.LOGIN}`} />} />
      <Route path=":lang">
        <Route path={AUTH_PATHS.DEFAULT} element={<Layout />}>
          {AUTH_ROUTES}
          {INVOICR_VIEW_ROUTE}
          {SINGLE_INVOICE_VIEW_ROUTE}
          {PROFILE_VIEW_ROUTE}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
