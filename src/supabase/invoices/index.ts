import { InvoiceUpdateData } from "@/types/invoices";
import { supabase } from "..";

export const updateInvoice = async (data: InvoiceUpdateData) => {
  const { id, ...updateData } = data;
  return await supabase
    .from("invoices")
    .update(updateData)
    .eq("id", Number(id))
    .single();
};
