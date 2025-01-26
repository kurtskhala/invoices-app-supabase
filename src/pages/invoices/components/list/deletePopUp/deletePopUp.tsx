import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeletePopUpProps } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteInvoice } from "@/hooks/invoices/useInvoices";
import { useTranslation } from "react-i18next";

const DeletePopUp: FC<DeletePopUpProps> = ({ createdId, id }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const lang = params.lang as string;

  const { mutate: deleteInvoice, isPending } = useDeleteInvoice();

  const handleDelete = async () => {
    try {
      await deleteInvoice(createdId, {
        onSuccess: () => {
          navigate(`/${lang}/invoices`);
        },
        onError: (error) => {
          console.error("Error deleting invoice:", error);
          alert("Failed to delete invoice. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error in delete handler:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-[9px] sm:text-[15px] bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 rounded-[24px] font-bold">
        {t("invoiceDetile-page.delete.button")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("invoiceDetile-page.delete.header")}</DialogTitle>
          <DialogDescription>
          {t("invoiceDetile-page.delete.text", {createdId})}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="secondary">
            {t("invoiceDetile-page.delete.cancel")}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {t("invoiceDetile-page.delete.button")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopUp;
