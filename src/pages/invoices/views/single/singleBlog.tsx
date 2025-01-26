import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LeftArrow from "@/assets/icon-arrow-left.svg";
import { Badge } from "@/components/ui/badge";
import EditAddDialog from "../../components/list/editAddInvoice";
import DeletePopUp from "../../components/list/deletePopUp/deletePopUp";
import {
  useInvoice,
  useUpdateInvoiceStatus,
} from "@/hooks/invoices/useInvoices";
import { useTranslation } from "react-i18next";

const Invoice = () => {
  const { lang, id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: invoice, isLoading, error } = useInvoice(id as string);

  const updateStatus = useUpdateInvoiceStatus();

  const handleGoBack = () => {
    navigate(`/${lang}/invoices`);
  };

  const handleMarkAsPaid = async () => {
    if (!invoice?.id) return;
    try {
      await updateStatus.mutateAsync({
        id: invoice.id,
        status: "paid",
      });
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Failed to update invoice status. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div className="h-sm:mt-[65px] mt-[20px] w-full flex flex-col items-center px-4 text-[9px] sm:text-[15px]">
      <div className="lg:w-[780px] md:w-[560px] flex flex-col gap-y-[24px] items-start">
        <Button variant="link" onClick={handleGoBack} className="pl-0">
          <img src={LeftArrow} alt="left arrow" />
          <p className="pt-1">{t("invoiceDetile-page.go-back")}</p>
        </Button>
        <div className="w-full flex flex-wrap gap-y-4 items-center justify-center sm:justify-between p-[12px] sm:py-[32px] sm:px-[24px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)]">
          <div className="flex justify-between items-center gap-x-[10px] text-[9px] sm:text-[15px]">
            <p className="text-muted-foreground">
              {t("invoiceDetile-page.status")}
            </p>
            <Badge variant={invoice?.status}>{invoice?.status}</Badge>
          </div>
          <div className="flex justify-between items-center gap-x-[10px]">
            <EditAddDialog
              action="Edit"
              createdId={invoice?.id}
              id={invoice?.id}
            />
            <DeletePopUp createdId={invoice?.id} id={invoice?._id} />
            {invoice?.status !== "paid" && (
              <Button
                className="text-[9px] sm:text-[15px]"
                variant="custom"
                onClick={handleMarkAsPaid}
                disabled={updateStatus.isPending}
              >
                {updateStatus.isPending
                  ? t("invoiceDetile-page.updating")
                  : t("invoiceDetile-page.mark-paid")}
              </Button>
            )}
          </div>
        </div>
        {/* details */}
        <div className="w-full p-6 rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)]">
          <div className="flex justify-between mb-8">
            <div>
              <p className="font-bold text-xl">#{invoice?.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-8">
                <p className="text-muted-foreground mb-2">
                  {t("invoiceDetile-page.invoice-details.invoice-date")}
                </p>
                <p className="font-bold">{invoice?.invoice_date}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">
                  {t("invoiceDetile-page.invoice-details.payment-due")}
                </p>
                <p className="font-bold">{invoice?.payment_terms}</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground mb-2">
                {t("invoiceDetile-page.invoice-details.bill-to")}
              </p>
              <p className="font-bold mb-2">{invoice?.client_name}</p>
              <p className="text-muted-foreground">{invoice?.client_address}</p>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-background rounded-lg">
            <div className="grid grid-cols-4 mb-4 text-muted-foreground p-6">
              <p>{t("invoiceDetile-page.invoice-details.item-name")}</p>
              <p className="text-center">
                {t("invoiceDetile-page.invoice-details.quantity")}
              </p>
              <p className="text-right">
                {t("invoiceDetile-page.invoice-details.price")}
              </p>
              <p className="text-right">
                {t("invoiceDetile-page.invoice-details.total")}
              </p>
            </div>

            {invoice?.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 mb-4 p-6">
                <p className="font-bold">{item.name}</p>
                <p className="text-center">{item.quantity}</p>
                <p className="text-right">£ {item.price}</p>
                <p className="text-right font-bold">
                  £ {item.quantity * item.price}
                </p>
              </div>
            ))}

            {/* Total Amount */}
            <div className="bg-foreground text-background mt-8 p-6 rounded-lg flex justify-between items-center">
              <p>{t("invoiceDetile-page.invoice-details.amount-due")}</p>
              <p className="text-2xl font-bold">
                £{" "}
                {invoice?.items.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
