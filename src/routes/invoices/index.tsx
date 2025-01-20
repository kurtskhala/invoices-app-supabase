import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { INVOICE_PATHS } from "./index.enum";

const InvoiceView = lazy(() => import("@/pages/invoices/views/list"));
const SingleInvoiceView = lazy(() => import("@/pages/invoices/views/single"));

export const INVOICR_VIEW_ROUTE = [
  <Route
    key="invoices"
    path={INVOICE_PATHS.INVOICES}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceView />
      </Suspense>
    }
  />,
];

export const SINGLE_INVOICE_VIEW_ROUTE = [
  <Route
    key="invoices"
    path={INVOICE_PATHS.INVOICES + "/:id"}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <SingleInvoiceView />
      </Suspense>
    }
  />,
];
