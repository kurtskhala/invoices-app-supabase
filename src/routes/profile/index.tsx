import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { PROFILE_PATHS } from "./index.enum";

const InvoiceView = lazy(() => import("@/pages/profile/profile"));

export const PROFILE_VIEW_ROUTE = [
  <Route
    key="invoices"
    path={PROFILE_PATHS.PROFILE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceView />
      </Suspense>
    }
  />,
];
